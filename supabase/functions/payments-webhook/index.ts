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

    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object;
      await handlePaid(session, env);
    } else if (event.type === "checkout.session.expired") {
      await supabase
        .from("orders")
        .update({ status: "expired" })
        .eq("stripe_session_id", event.data.object.id);
    } else if (event.type === "checkout.session.async_payment_failed") {
      await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("stripe_session_id", event.data.object.id);
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

async function handlePaid(session: any, env: StripeEnv) {
  if (session.payment_status !== "paid") {
    console.log("[webhook] session not paid yet:", session.payment_status);
    return;
  }

  const { data: order, error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      stripe_payment_intent_id: session.payment_intent ?? null,
    })
    .eq("stripe_session_id", session.id)
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
