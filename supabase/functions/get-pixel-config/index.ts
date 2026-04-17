import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/stripe.ts";

// Returns the public META_PIXEL_ID so the client-side Pixel can initialize.
// The Pixel ID is NOT a secret (it's public in the HTML of any site that uses Meta Pixel).
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const pixelId = Deno.env.get("META_PIXEL_ID") ?? null;
  return new Response(JSON.stringify({ pixelId }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
