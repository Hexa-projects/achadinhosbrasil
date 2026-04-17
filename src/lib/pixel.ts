// Meta Pixel client-side helper. The Pixel ID is fetched from an edge function
// (it's a public ID, not a secret) so the user only needs to set it once in Lovable Cloud secrets.
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let initialized = false;
let pixelIdCache: string | null = null;

async function fetchPixelId(): Promise<string | null> {
  if (pixelIdCache !== null) return pixelIdCache;
  try {
    const { data } = await supabase.functions.invoke("get-pixel-config");
    pixelIdCache = (data?.pixelId as string | undefined) ?? null;
    return pixelIdCache;
  } catch {
    return null;
  }
}

function injectPixelScript() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;
  /* eslint-disable */
  // @ts-ignore
  !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
}

export async function initPixel(): Promise<string | null> {
  if (initialized) return pixelIdCache;
  const id = await fetchPixelId();
  if (!id) return null;
  injectPixelScript();
  window.fbq?.("init", id);
  window.fbq?.("track", "PageView");
  initialized = true;
  return id;
}

export function trackPixel(
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (options?.eventID) {
    window.fbq("track", eventName, params ?? {}, { eventID: options.eventID });
  } else {
    window.fbq("track", eventName, params ?? {});
  }
}

// Read fbp / fbc cookies (set automatically by Pixel) for CAPI deduplication
export function getFbCookies(): { fbp: string | null; fbc: string | null } {
  if (typeof document === "undefined") return { fbp: null, fbc: null };
  const get = (name: string): string | null => {
    const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[2]) : null;
  };
  return { fbp: get("_fbp"), fbc: get("_fbc") };
}

export function getUtmParams(): Record<string, string | null> {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source: sp.get("utm_source"),
    utm_medium: sp.get("utm_medium"),
    utm_campaign: sp.get("utm_campaign"),
    utm_content: sp.get("utm_content"),
    utm_term: sp.get("utm_term"),
  };
}
