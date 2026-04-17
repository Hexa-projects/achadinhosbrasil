import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";
import { type StripeEnv, createStripeClient, corsHeaders } from "../_shared/stripe.ts";
import { sendMetaCapiEvent } from "../_shared/meta-capi.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const BodySchema = z.object({
  priceId: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  quantity: z.number().int().min(1).max(5).default(1),
  environment: z.enum(["sandbox", "live"]).default("sandbox"),
  returnUrl: z.string().url().optional(),
  customer: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(10).max(20),
    cpf: z.string().trim().min(11).max(14),
  }),
  shipping: z.object({
    zip: z.string().trim().min(8).max(9),
    street: z.string().trim().min(2).max(200),
    number: z.string().trim().min(1).max(20),
    complement: z.string().trim().max(120).optional().nullable(),
    neighborhood: z.string().trim().min(2).max(120),
    city: z.string().trim().min(2).max(120),
    state: z.string().trim().length(2),
  }),
  tracking: z
    .object({
      eventId: z.string().min(8).max(80),
      fbp: z.string().nullable().optional(),
      fbc: z.string().nullable().optional(),
      utm_source: z.string().nullable().optional(),
      utm_medium: z.string().nullable().optional(),
      utm_campaign: z.string().nullable().optional(),
      utm_content: z.string().nullable().optional(),
      utm_term: z.string().nullable().optional(),
    })
    .optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const { priceId, quantity, environment, returnUrl, customer, shipping, tracking } =
      parsed.data;
    const env = environment as StripeEnv;
    const stripe = createStripeClient(env);

    // Resolve human-readable price → real Stripe price
    const prices = await stripe.prices.list({ lookup_keys: [priceId] });
    if (!prices.data.length) {
      return new Response(JSON.stringify({ error: "Price not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const stripePrice = prices.data[0];
    const amountCents = (stripePrice.unit_amount ?? 0) * quantity;
    const eventId = tracking?.eventId ?? crypto.randomUUID();

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      null;
    const clientUserAgent = req.headers.get("user-agent");

    // Create Stripe Embedded Checkout session
    const origin = req.headers.get("origin") ?? "https://achadinhosbrasil.lovable.app";
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity }],
      mode: "payment",
      ui_mode: "embedded",
      return_url:
        returnUrl ?? `${origin}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: customer.email,
      payment_method_types: ["card"],
      metadata: {
        event_id: eventId,
        cpf: customer.cpf,
        phone: customer.phone,
      },
    });

    // Persist order row (status=pending). Webhook flips to paid.
    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_cpf: customer.cpf,
        shipping_zip: shipping.zip,
        shipping_street: shipping.street,
        shipping_number: shipping.number,
        shipping_complement: shipping.complement ?? null,
        shipping_neighborhood: shipping.neighborhood,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        price_id: priceId,
        quantity,
        amount_cents: amountCents,
        currency: stripePrice.currency,
        stripe_session_id: session.id,
        status: "pending",
        environment: env,
        meta_event_id: eventId,
        fbp: tracking?.fbp ?? null,
        fbc: tracking?.fbc ?? null,
        utm_source: tracking?.utm_source ?? null,
        utm_medium: tracking?.utm_medium ?? null,
        utm_campaign: tracking?.utm_campaign ?? null,
        utm_content: tracking?.utm_content ?? null,
        utm_term: tracking?.utm_term ?? null,
        client_ip: clientIp,
        client_user_agent: clientUserAgent,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to insert order:", insertError);
      return new Response(JSON.stringify({ error: "Failed to record order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fire InitiateCheckout server-side (deduped with client Pixel via eventId)
    const [firstName, ...rest] = customer.name.trim().split(/\s+/);
    sendMetaCapiEvent({
      eventName: "InitiateCheckout",
      eventId,
      eventSourceUrl: origin + "/checkout",
      value: amountCents / 100,
      currency: stripePrice.currency,
      contentIds: [priceId],
      contentType: "product",
      contentName: "CheerDots 2",
      user: {
        email: customer.email,
        phone: customer.phone,
        firstName,
        lastName: rest.join(" ") || undefined,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        country: "br",
        fbp: tracking?.fbp,
        fbc: tracking?.fbc,
        clientIp,
        clientUserAgent,
        externalId: order.id,
      },
    }).catch((e) => console.error("CAPI InitiateCheckout failed:", e));

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret, orderId: order.id, eventId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("create-checkout error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
