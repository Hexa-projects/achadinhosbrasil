import { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { stripeEnvironment } from "@/lib/stripe";
import { initPixel, trackPixel, getFbCookies, getUtmParams } from "@/lib/pixel";
import logo from "@/assets/logo-achadinhos.png";

const PRICE_ID = "cheerdots_2_lote_promo";
const PRICE_BRL = 497;

type HostedCheckoutResp = {
  url: string;
};

export default function CheckoutPage() {
  const redirectStartedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (redirectStartedRef.current) return;
    redirectStartedRef.current = true;
    redirectToStripe();
  }, []);

  async function redirectToStripe() {
    setError(null);
    const evtId = `evt_${crypto.randomUUID()}`;
    const { fbp, fbc } = getFbCookies();
    const utm = getUtmParams();

    await initPixel();
    trackPixel(
      "InitiateCheckout",
      {
        content_ids: [PRICE_ID],
        content_type: "product",
        content_name: "CheerDots 2",
        value: PRICE_BRL,
        currency: "BRL",
      },
      { eventID: evtId },
    );

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          mode: "hosted",
          priceId: PRICE_ID,
          quantity: 1,
          environment: stripeEnvironment,
          returnUrl: `${window.location.origin}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
          tracking: { eventId: evtId, fbp, fbc, ...utm },
        },
      });

      if (error || !data?.url) {
        throw new Error(error?.message || "Não foi possível abrir o checkout da Stripe");
      }

      window.location.assign((data as HostedCheckoutResp).url);
    } catch (e) {
      redirectStartedRef.current = false;
      setError(e instanceof Error ? e.message : "Erro inesperado ao abrir a Stripe");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PaymentTestModeBanner />
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_24px_80px_-32px_hsl(var(--primary)/0.65)]">
          <img src={logo} alt="Achadinhos Shopping" className="w-12 h-12 rounded-xl mx-auto mb-5" />
          <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            {error ? (
              <ShieldCheck className="w-5 h-5 text-primary" />
            ) : (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            )}
          </div>
          <h1 className="font-sora font-semibold tracking-[-0.02em] text-2xl text-foreground mb-2">
            Abrindo checkout seguro
          </h1>
          <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-6">
            Você será redirecionado para a Stripe para finalizar seu CheerDots 2 com pagamento protegido.
          </p>

          {error && (
            <div className="space-y-3">
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
              <button
                onClick={redirectToStripe}
                className="w-full h-12 rounded-full bg-primary text-primary-foreground font-inter text-sm font-semibold hover:opacity-95 transition-opacity"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
