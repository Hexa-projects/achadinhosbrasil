import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Truck,
  MessageCircle,
  Lock,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { z } from "zod";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { stripeEnvironment, getStripe } from "@/lib/stripe";
import { initPixel, trackPixel, getFbCookies, getUtmParams } from "@/lib/pixel";
import {
  identificationSchema,
  shippingSchema,
  type IdentificationData,
  type ShippingData,
  maskPhone,
  maskCpf,
  maskCep,
} from "@/lib/checkoutSchemas";
import logo from "@/assets/logo-achadinhos.png";
import { ScarcityTimer } from "@/components/ScarcityTimer";

const PRICE_ID = "cheerdots_2_lote_promo";
const PRICE_BRL = 497;
const COMPARE_BRL = 997;
const SAVINGS_BRL = COMPARE_BRL - PRICE_BRL;

const STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

type CreateCheckoutResp = {
  clientSecret: string;
  paymentIntentId: string;
  orderId: string;
  eventId: string;
  amountCents: number;
  currency: string;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [identification, setIdentification] = useState<IdentificationData>({
    name: "", email: "", phone: "", cpf: "",
  });
  const [shipping, setShipping] = useState<ShippingData>({
    zip: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cepLoading, setCepLoading] = useState(false);

  const [intent, setIntent] = useState<CreateCheckoutResp | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  // Track latest typed values to debounce intent creation
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    initPixel().then(() => {
      trackPixel("ViewContent", {
        content_ids: [PRICE_ID],
        content_type: "product",
        content_name: "CheerDots 2",
        value: PRICE_BRL,
        currency: "BRL",
      });
    });
  }, []);

  // ViaCEP autofill
  useEffect(() => {
    const cep = shipping.zip.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepLoading(true);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((r) => r.json())
      .then((d) => {
        if (d.erro) return;
        setShipping((s) => ({
          ...s,
          street: d.logradouro || s.street,
          neighborhood: d.bairro || s.neighborhood,
          city: d.localidade || s.city,
          state: (d.uf || s.state).toUpperCase(),
        }));
      })
      .catch(() => {})
      .finally(() => setCepLoading(false));
  }, [shipping.zip]);

  // Validate full form (id + shipping). Used to gate intent creation + payment.
  const formValid = useMemo(() => {
    const idOk = identificationSchema.safeParse(identification).success;
    const shipOk = shippingSchema.safeParse(shipping).success;
    return idOk && shipOk;
  }, [identification, shipping]);

  // Auto-create PaymentIntent when form becomes valid (debounced).
  // The PaymentElement only mounts when we have a clientSecret.
  useEffect(() => {
    if (!formValid) return;
    if (intent) return; // already created — never recreate (would change clientSecret)
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      await createIntent();
    }, 400);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValid]);

  async function createIntent() {
    setIntentLoading(true);
    setIntentError(null);
    const evtId = `evt_${crypto.randomUUID()}`;
    const { fbp, fbc } = getFbCookies();
    const utm = getUtmParams();

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
          priceId: PRICE_ID,
          quantity: 1,
          environment: stripeEnvironment,
          customer: identification,
          shipping,
          tracking: { eventId: evtId, fbp, fbc, ...utm },
        },
      });
      if (error || !data?.clientSecret) {
        throw new Error(error?.message || "Não foi possível iniciar o pagamento");
      }
      setIntent(data as CreateCheckoutResp);
    } catch (e) {
      setIntentError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setIntentLoading(false);
    }
  }

  function validateAll(): boolean {
    const errs: Record<string, string> = {};
    const idR = identificationSchema.safeParse(identification);
    if (!idR.success) {
      idR.error.errors.forEach((er) => (errs[er.path[0] as string] = er.message));
    }
    const shR = shippingSchema.safeParse(shipping);
    if (!shR.success) {
      shR.error.errors.forEach((er) => (errs[er.path[0] as string] = er.message));
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const elementsOptions: StripeElementsOptions | null = intent
    ? {
        clientSecret: intent.clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#6366f1",
            colorBackground: "#0a0a0f",
            colorText: "#f8fafc",
            colorTextSecondary: "#94a3b8",
            colorTextPlaceholder: "#64748b",
            colorDanger: "#f87171",
            colorIconTab: "#94a3b8",
            colorIconTabSelected: "#a5b4fc",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSizeBase: "15px",
            spacingUnit: "5px",
            borderRadius: "12px",
          },
          rules: {
            ".Input": {
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              padding: "12px 14px",
            },
            ".Input:focus": {
              border: "1px solid #6366f1",
              boxShadow: "0 0 0 3px rgba(99,102,241,0.2)",
            },
            ".Tab": {
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.10)",
            },
            ".Tab--selected": {
              backgroundColor: "rgba(99,102,241,0.10)",
              border: "1px solid #6366f1",
            },
            ".Label": {
              color: "#cbd5e1",
              fontSize: "13px",
              fontWeight: "500",
            },
          },
        },
      }
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PaymentTestModeBanner />

      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Achadinhos Shopping" className="w-7 h-7 rounded-md" />
            <span className="text-sm font-semibold text-white tracking-tight hidden sm:inline">
              Achadinhos Shopping
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pagamento seguro</span>
          </div>
        </div>
      </header>

      {/* Promo strip */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10 border-b border-white/5">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span className="text-slate-200">
            Lote promocional ativo:{" "}
            <span className="font-semibold text-white">
              economia de R$ {SAVINGS_BRL},00 hoje
            </span>
          </span>
        </div>
      </div>

      <main className="container mx-auto px-4 pt-6 pb-32 lg:pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 text-center sm:text-left"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Finalize seu CheerDots 2
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Compra protegida, entrega com rastreio e suporte em português.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
            {/* LEFT — Form + Payment */}
            <div className="space-y-5">
              {/* Express Checkout (mounted only when intent ready) */}
              {elementsOptions && intent && (
                <Elements key={intent.paymentIntentId} stripe={getStripe()} options={elementsOptions}>
                  <ExpressBlock />
                </Elements>
              )}

              {/* Identification */}
              <SectionCard
                step="1"
                title="Seus dados"
                hint="Para envio do pedido e atualizações"
              >
                <Field
                  label="Nome completo"
                  value={identification.name}
                  onChange={(v) => setIdentification({ ...identification, name: v })}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={identification.email}
                  onChange={(v) => setIdentification({ ...identification, email: v })}
                  error={errors.email}
                  autoComplete="email"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="WhatsApp"
                    value={identification.phone}
                    onChange={(v) => setIdentification({ ...identification, phone: maskPhone(v) })}
                    placeholder="(11) 91234-5678"
                    error={errors.phone}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <Field
                    label="CPF"
                    value={identification.cpf}
                    onChange={(v) => setIdentification({ ...identification, cpf: maskCpf(v) })}
                    placeholder="000.000.000-00"
                    error={errors.cpf}
                    inputMode="numeric"
                  />
                </div>
              </SectionCard>

              {/* Shipping */}
              <SectionCard
                step="2"
                title="Endereço de entrega"
                hint={
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <Truck className="w-3.5 h-3.5" /> Frete grátis para todo o Brasil
                  </span>
                }
              >
                <div className="grid sm:grid-cols-[180px_1fr] gap-4">
                  <Field
                    label="CEP"
                    value={shipping.zip}
                    onChange={(v) => setShipping({ ...shipping, zip: maskCep(v) })}
                    placeholder="00000-000"
                    error={errors.zip}
                    hint={cepLoading ? "Buscando..." : undefined}
                    autoComplete="postal-code"
                    inputMode="numeric"
                  />
                  <Field
                    label="Rua / Avenida"
                    value={shipping.street}
                    onChange={(v) => setShipping({ ...shipping, street: v })}
                    error={errors.street}
                    autoComplete="address-line1"
                  />
                </div>
                <div className="grid sm:grid-cols-[140px_1fr] gap-4">
                  <Field
                    label="Número"
                    value={shipping.number}
                    onChange={(v) => setShipping({ ...shipping, number: v })}
                    error={errors.number}
                    inputMode="numeric"
                  />
                  <Field
                    label="Complemento (opcional)"
                    value={shipping.complement || ""}
                    onChange={(v) => setShipping({ ...shipping, complement: v })}
                  />
                </div>
                <Field
                  label="Bairro"
                  value={shipping.neighborhood}
                  onChange={(v) => setShipping({ ...shipping, neighborhood: v })}
                  error={errors.neighborhood}
                />
                <div className="grid sm:grid-cols-[1fr_120px] gap-4">
                  <Field
                    label="Cidade"
                    value={shipping.city}
                    onChange={(v) => setShipping({ ...shipping, city: v })}
                    error={errors.city}
                  />
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">UF</label>
                    <select
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="w-full h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-base focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">—</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs text-red-400 mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Payment */}
              <SectionCard
                step="3"
                title="Pagamento"
                hint="Cartão (até 12x), Pix e mais"
              >
                {!formValid && (
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-slate-400">
                    Preencha seus dados e endereço acima para liberar o pagamento.
                  </div>
                )}

                {formValid && intentLoading && !intent && (
                  <div className="space-y-3">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </div>
                )}

                {intentError && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300 mb-3">
                    {intentError}
                    <button
                      onClick={createIntent}
                      className="ml-2 underline hover:text-red-200"
                    >
                      Tentar novamente
                    </button>
                  </div>
                )}

                {elementsOptions && intent && (
                  <Elements key={intent.paymentIntentId} stripe={getStripe()} options={elementsOptions}>
                    <PaymentBlock
                      paymentIntentId={intent.paymentIntentId}
                      orderId={intent.orderId}
                      validateAll={validateAll}
                    />
                  </Elements>
                )}
              </SectionCard>

              <TrustStack />
            </div>

            {/* RIGHT — Order summary (sticky desktop) */}
            <aside className="lg:sticky lg:top-20 self-start order-first lg:order-last">
              <OrderSummary />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------- Sub-components -------------------- */

function SectionCard({
  step, title, hint, children,
}: {
  step: string; title: string; hint?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-bold flex items-center justify-center">
          {step}
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-none">
            {title}
          </h2>
          {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

function Field({
  label, value, onChange, error, hint, type = "text", placeholder, autoComplete, inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric" | "email";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block text-xs font-medium text-slate-300">{label}</label>
        {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`w-full h-12 px-3.5 rounded-xl bg-white/5 border text-white text-base placeholder:text-slate-500 focus:outline-none transition-colors ${
          error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-indigo-500"
        }`}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function SkeletonRow() {
  return <div className="h-12 rounded-xl bg-white/5 border border-white/10 animate-pulse" />;
}

function ExpressBlock() {
  const [available, setAvailable] = useState<boolean | null>(null);
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 ${
        available === false ? "hidden" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-indigo-300" />
        <h2 className="text-sm font-semibold text-white tracking-tight">
          Finalizar em 1 clique
        </h2>
      </div>
      <ExpressCheckoutElement
        onReady={(e) => {
          const opts = e?.availablePaymentMethods;
          const any = opts && Object.values(opts).some(Boolean);
          setAvailable(!!any);
        }}
        onConfirm={() => {
          // Stripe handles confirmation directly via PaymentIntent attached
        }}
        options={{ buttonHeight: 48, layout: { maxColumns: 2, maxRows: 1 } }}
      />
      {available && (
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] uppercase tracking-wider text-slate-500">
            ou pague com cartão / Pix
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      )}
    </motion.section>
  );
}

function PaymentBlock({
  paymentIntentId, orderId, validateAll,
}: {
  paymentIntentId: string;
  orderId: string;
  validateAll: () => boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    if (!validateAll()) return;
    setSubmitting(true);
    setErrMsg(null);

    const returnUrl = `${window.location.origin}/checkout/sucesso?payment_intent=${paymentIntentId}&order_id=${orderId}`;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    if (error) {
      setErrMsg(
        error.message ||
          "Não foi possível confirmar este pagamento agora. Tente outro método ou refaça em 30 segundos.",
      );
      setSubmitting(false);
    }
    // success → Stripe redirects to return_url
  }

  return (
    <div className="space-y-4">
      <PaymentElement
        options={{
          layout: { type: "tabs", defaultCollapsed: false },
        }}
      />

      {errMsg && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
          {errMsg}
        </div>
      )}

      {/* Desktop CTA */}
      <button
        onClick={handlePay}
        disabled={submitting || !stripe || !elements}
        className="hidden lg:inline-flex w-full h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-semibold shadow-[0_8px_30px_-10px_rgba(99,102,241,0.6)] hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        style={{ height: 52 }}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Processando…
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" /> Pagar com segurança
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center">
        Ao continuar, você concorda com os Termos e Política de Privacidade.
      </p>

      {/* Mobile sticky CTA */}
      <div className="fixed lg:hidden bottom-0 inset-x-0 z-40 border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Total</span>
          <span className="text-base font-bold text-white">R$ {PRICE_BRL},00</span>
        </div>
        <button
          onClick={handlePay}
          disabled={submitting || !stripe || !elements}
          className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processando…
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" /> Pagar com segurança
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5">
        <p className="text-white text-[10px] font-bold uppercase tracking-[0.15em] text-center">
          Lote promocional · 50% OFF
        </p>
      </div>
      <div className="p-5 space-y-4">
        <ScarcityTimer />
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-2xl">
            🖱️
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold">CheerDots 2</p>
            <p className="text-slate-400 text-xs mt-0.5">Mouse 6-em-1 com IA · 1 unidade</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={`R$ ${COMPARE_BRL},00`} strike />
          <Row label="Desconto promocional" value={`- R$ ${SAVINGS_BRL},00`} accent="text-emerald-400" />
          <Row label="Frete" value="Grátis" accent="text-emerald-400" />
        </div>
        <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
          <span className="text-slate-300 text-sm">Total</span>
          <div className="text-right">
            <p className="text-2xl font-black text-white tracking-tight">
              R$ {PRICE_BRL},00
            </p>
            <p className="text-[11px] text-slate-500">ou 12x sem juros no cartão</p>
          </div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300 flex items-start gap-2">
          <BadgeCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Você economiza{" "}
            <strong className="text-emerald-200">R$ {SAVINGS_BRL},00</strong> hoje.
          </span>
        </div>
      </div>
    </div>
  );
}

function TrustStack() {
  const items = [
    { icon: Lock, label: "Checkout seguro", sub: "Criptografia SSL · Stripe" },
    { icon: ShieldCheck, label: "Garantia 12 meses", sub: "Troca ou dinheiro de volta" },
    { icon: Truck, label: "Frete com rastreio", sub: "Envio em 1–2 dias úteis" },
    { icon: MessageCircle, label: "Suporte WhatsApp", sub: "Atendimento humano" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 text-center"
        >
          <it.icon className="w-4 h-4 text-indigo-300 mx-auto mb-1.5" />
          <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight">
            {it.label}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{it.sub}</p>
        </div>
      ))}
    </div>
  );
}

function Row({
  label, value, strike, accent,
}: { label: string; value: string; strike?: boolean; accent?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className={`${strike ? "line-through text-slate-500" : accent || "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
