import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook, corsHeaders } from "../_shared/stripe.ts";
import { sendMetaCapiEvent } from "../_shared/meta-capi.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const url = new URL(req.url);
  const env = (url.searchParams.get("env") || "sandbox") as StripeEnv;

  try {
    const event = await verifyWebhook(req, env);
    console.log("[webhook] event:", event.type, "env:", env);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object, env);
    } else if (event.type === "payment_intent.succeeded") {
      await handlePaid(event.data.object, env);
    } else if (event.type === "payment_intent.payment_failed") {
      await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("stripe_payment_intent_id", event.data.object.id)
        .eq("environment", env);
    } else if (event.type === "payment_intent.canceled") {
      await supabase
        .from("orders")
        .update({ status: "canceled" })
        .eq("stripe_payment_intent_id", event.data.object.id)
        .eq("environment", env);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[webhook] error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});

async function handleCheckoutSessionCompleted(session: any, env: StripeEnv) {
  if (session.payment_status !== "paid" || !session.payment_intent) return;

  const existing = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing.data?.id) return;

  const details = session.customer_details ?? {};
  const shipping = details.address ?? session.shipping_details?.address ?? {};
  const cpf = session.custom_fields?.find((field: any) => field.key === "cpf")?.text?.value ?? "Não informado";
  const amountCents = session.amount_total ?? 0;
  const eventId = session.metadata?.event_id ?? crypto.randomUUID();
  const priceId = session.metadata?.price_id ?? "cheerdots_2_lote_promo";
  const quantity = Number(session.metadata?.quantity ?? 1);

  const { error } = await supabase.from("orders").insert({
    customer_name: details.name ?? "Cliente Stripe",
    customer_email: details.email ?? "sem-email@stripe.local",
    customer_phone: details.phone ?? "Não informado",
    customer_cpf: cpf,
    shipping_zip: shipping.postal_code ?? "Não informado",
    shipping_street: shipping.line1 ?? "Não informado",
    shipping_number: "S/N",
    shipping_complement: shipping.line2 ?? null,
    shipping_neighborhood: "Não informado",
    shipping_city: shipping.city ?? "Não informado",
    shipping_state: shipping.state ?? "BR",
    price_id: priceId,
    quantity,
    amount_cents: amountCents,
    currency: session.currency ?? "brl",
    stripe_payment_intent_id: session.payment_intent,
    stripe_session_id: session.id,
    status: "paid",
    environment: env,
    meta_event_id: eventId,
    paid_at: new Date().toISOString(),
  });

  if (error) console.error("[webhook] could not insert hosted checkout order:", error);
}

async function handlePaid(intent: any, env: StripeEnv) {
  const { data: order, error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
    })
    .eq("stripe_payment_intent_id", intent.id)
    .eq("environment", env)
    .select("*")
    .single();

  if (error || !order) {
    console.error("[webhook] could not update order:", error);
    return;
  }

  if (order.capi_purchase_sent) {
    console.log("[webhook] CAPI Purchase already sent for order", order.id);
    return;
  }

  const [firstName, ...rest] = String(order.customer_name).trim().split(/\s+/);
  const result = await sendMetaCapiEvent({
    eventName: "Purchase",
    eventId: order.meta_event_id,
    value: order.amount_cents / 100,
    currency: (order.currency || "brl").toUpperCase(),
    contentIds: [order.price_id],
    contentType: "product",
    contentName: "CheerDots 2",
    user: {
      email: order.customer_email,
      phone: order.customer_phone,
      firstName,
      lastName: rest.join(" ") || undefined,
      city: order.shipping_city,
      state: order.shipping_state,
      zip: order.shipping_zip,
      country: "br",
      fbp: order.fbp,
      fbc: order.fbc,
      clientIp: order.client_ip,
      clientUserAgent: order.client_user_agent,
      externalId: order.id,
    },
  });

  if (result.ok) {
    await supabase
      .from("orders")
      .update({ capi_purchase_sent: true })
      .eq("id", order.id);
  }
}
