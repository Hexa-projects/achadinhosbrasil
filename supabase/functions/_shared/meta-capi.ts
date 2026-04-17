// Meta Conversions API — server-side event sender with deduplication
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api

const CAPI_VERSION = "v19.0";

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string; // ISO 2-letter, default br
  fbp?: string | null;
  fbc?: string | null;
  clientIp?: string | null;
  clientUserAgent?: string | null;
  externalId?: string | null;
}

export interface CapiEventInput {
  eventName: string; // 'Purchase' | 'InitiateCheckout' | 'Lead' | ...
  eventId: string; // for deduplication with Pixel client-side
  eventSourceUrl?: string;
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentType?: "product";
  contentName?: string;
  user: CapiUserData;
}

export async function sendMetaCapiEvent(input: CapiEventInput): Promise<{
  ok: boolean;
  status: number;
  body: string;
}> {
  const pixelId = Deno.env.get("META_PIXEL_ID");
  const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");

  if (!pixelId) {
    console.warn("[meta-capi] META_PIXEL_ID not set — skipping CAPI send");
    return { ok: false, status: 0, body: "META_PIXEL_ID not set" };
  }
  if (!accessToken) {
    console.warn("[meta-capi] META_CAPI_ACCESS_TOKEN not set — skipping CAPI send");
    return { ok: false, status: 0, body: "META_CAPI_ACCESS_TOKEN not set" };
  }

  const u = input.user;
  const phoneDigits = u.phone?.replace(/\D/g, "");

  const userData: Record<string, unknown> = {};
  if (u.email) userData.em = [await sha256(u.email)];
  if (phoneDigits) userData.ph = [await sha256(phoneDigits)];
  if (u.firstName) userData.fn = [await sha256(u.firstName)];
  if (u.lastName) userData.ln = [await sha256(u.lastName)];
  if (u.city) userData.ct = [await sha256(u.city)];
  if (u.state) userData.st = [await sha256(u.state)];
  if (u.zip) userData.zp = [await sha256(u.zip.replace(/\D/g, ""))];
  if (u.country) userData.country = [await sha256(u.country)];
  if (u.externalId) userData.external_id = [await sha256(u.externalId)];
  if (u.fbp) userData.fbp = u.fbp;
  if (u.fbc) userData.fbc = u.fbc;
  if (u.clientIp) userData.client_ip_address = u.clientIp;
  if (u.clientUserAgent) userData.client_user_agent = u.clientUserAgent;

  const customData: Record<string, unknown> = {};
  if (input.value !== undefined) customData.value = input.value;
  if (input.currency) customData.currency = input.currency.toUpperCase();
  if (input.contentIds?.length) customData.content_ids = input.contentIds;
  if (input.contentType) customData.content_type = input.contentType;
  if (input.contentName) customData.content_name = input.contentName;

  const payload = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: customData,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${CAPI_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const text = await res.text();
    console.log(`[meta-capi] ${input.eventName} ${input.eventId} → ${res.status}`, text);
    return { ok: res.ok, status: res.status, body: text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[meta-capi] fetch error:", msg);
    return { ok: false, status: 0, body: msg };
  }
}
