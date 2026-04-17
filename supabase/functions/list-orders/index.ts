import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ADMIN_PASSWORD = Deno.env.get("ADMIN_DASHBOARD_PASSWORD") ?? "";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const auth = req.headers.get("x-admin-password") ?? "";
    if (!ADMIN_PASSWORD || auth !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const status = url.searchParams.get("status"); // pending|paid|failed|expired|canceled|all
    const since = url.searchParams.get("since"); // ISO date
    const until = url.searchParams.get("until");
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 200), 1000);

    let q = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status && status !== "all") q = q.eq("status", status);
    if (since) q = q.gte("created_at", since);
    if (until) q = q.lte("created_at", until);

    const { data, error } = await q;
    if (error) throw error;

    return new Response(JSON.stringify({ orders: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
