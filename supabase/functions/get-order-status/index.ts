import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient, corsHeaders } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");
    const environment = (url.searchParams.get("env") || "sandbox") as StripeEnv;
    if (!sessionId || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
      return new Response(JSON.stringify({ error: "Invalid session_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fast path: poll Stripe directly for the freshest status (webhook may lag a few seconds)
    const stripe = createStripeClient(environment);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const { data: order } = await supabase
      .from("orders")
      .select(
        "id,status,amount_cents,currency,customer_name,customer_email,price_id,meta_event_id,capi_purchase_sent",
      )
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    return new Response(
      JSON.stringify({
        stripe_status: session.status,
        payment_status: session.payment_status,
        order,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
