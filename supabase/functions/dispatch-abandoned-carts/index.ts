import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/stripe.ts";

/**
 * Dispatcher: finds orders that are still `pending` after 1 hour
 * (and ≤ 24h old) and have NOT received a recovery email yet.
 * Calls send-transactional-email per order.
 *
 * Trigger via pg_cron every 15 minutes.
 */

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: candidates, error } = await supabase
      .from("orders")
      .select("id, customer_email, customer_name, customer_phone, amount_cents, recovery_email_sent")
      .eq("status", "pending")
      .lt("created_at", oneHourAgo)
      .gt("created_at", dayAgo)
      .eq("recovery_email_sent", false)
      .limit(50);

    if (error) throw error;
    if (!candidates?.length) {
      return new Response(JSON.stringify({ dispatched: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    for (const o of candidates) {
      try {
        const { error: invErr } = await supabase.functions.invoke(
          "send-transactional-email",
          {
            body: {
              templateName: "abandoned-cart",
              recipientEmail: o.customer_email,
              idempotencyKey: `abandoned-cart-${o.id}`,
              templateData: {
                name: o.customer_name?.split(" ")[0] ?? "olá",
                amountBrl: (o.amount_cents / 100).toFixed(2).replace(".", ","),
                checkoutUrl: `${Deno.env.get("PUBLIC_SITE_URL") ?? "https://achadinhosbrasil.lovable.app"}/checkout`,
              },
            },
          },
        );
        if (invErr) {
          console.error("[abandoned] send failed for", o.id, invErr);
          continue;
        }
        await supabase
          .from("orders")
          .update({ recovery_email_sent: true })
          .eq("id", o.id);
        sent += 1;
      } catch (e) {
        console.error("[abandoned] error for", o.id, e);
      }
    }

    return new Response(JSON.stringify({ candidates: candidates.length, sent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[dispatch-abandoned-carts] error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
