import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Package, MessageCircle, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackPixel, initPixel } from "@/lib/pixel";
import { stripeEnvironment } from "@/lib/stripe";

type OrderInfo = {
  id: string;
  status: string;
  amount_cents: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  price_id: string;
  meta_event_id: string;
  capi_purchase_sent: boolean;
};

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  // Stripe appends `payment_intent` and `payment_intent_client_secret` to the return_url
  const piId = params.get("payment_intent");
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initPixel();
  }, []);

  useEffect(() => {
    if (!piId) {
      setError("Pagamento não identificado");
      setLoading(false);
      return;
    }
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 12;

    async function poll() {
      attempts += 1;
      try {
        const url = `get-order-status?payment_intent=${encodeURIComponent(
          piId!,
        )}&env=${stripeEnvironment}`;
        const { data, error: fnErr } = await supabase.functions.invoke(url, {
          method: "GET",
        });
        if (cancelled) return;
        if (fnErr) throw fnErr;

        const status = data?.payment_status;
        const ord = data?.order as OrderInfo | undefined;
        if (status === "succeeded" && ord) {
          setOrder(ord);
          setPaid(true);
          setLoading(false);
          trackPixel(
            "Purchase",
            {
              value: ord.amount_cents / 100,
              currency: (ord.currency || "BRL").toUpperCase(),
              content_ids: [ord.price_id],
              content_type: "product",
              content_name: "CheerDots 2",
            },
            { eventID: ord.meta_event_id },
          );
          return;
        }
        if (attempts >= maxAttempts) {
          setOrder(ord ?? null);
          setLoading(false);
          return;
        }
        setTimeout(poll, 1500);
      } catch (e) {
        if (cancelled) return;
        if (attempts < maxAttempts) {
          setTimeout(poll, 1500);
          return;
        }
        setError(e instanceof Error ? e.message : "Erro ao consultar pagamento");
        setLoading(false);
      }
    }
    poll();
    return () => {
      cancelled = true;
    };
  }, [piId]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[120vw] h-[600px] rounded-full bg-indigo-500/15 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10 text-center"
      >
        {loading && (
          <>
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Confirmando pagamento…</h1>
            <p className="text-sm text-slate-400">
              Aguarde, estamos validando sua transação.
            </p>
          </>
        )}

        {!loading && paid && order && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Pedido confirmado!
            </h1>
            <p className="text-slate-300 text-sm mb-6">
              Obrigado, <span className="text-white font-semibold">{order.customer_name.split(" ")[0]}</span>!
              Enviamos a confirmação para <span className="text-white">{order.customer_email}</span>.
            </p>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-left mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-semibold text-white">CheerDots 2 · 1 un</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total pago</span>
                <span className="text-white font-bold">
                  R$ {(order.amount_cents / 100).toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-slate-500">Pedido</span>
                <span className="text-slate-400 font-mono">#{order.id.slice(0, 8)}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Em breve você receberá o código de rastreio no WhatsApp e email.
              Prazo médio de envio: 1–2 dias úteis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <Link
                to="/"
                className="flex-1 h-11 rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-white/90 inline-flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Início
              </Link>
            </div>
          </>
        )}

        {!loading && !paid && (
          <>
            <h1 className="text-xl font-bold text-white mb-2">Pagamento pendente</h1>
            <p className="text-sm text-slate-400 mb-5">
              {error ||
                "Seu pagamento ainda não foi confirmado. Se você usou Pix/boleto, pode levar alguns minutos."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-white/90"
            >
              <Home className="w-4 h-4" /> Voltar ao início
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
