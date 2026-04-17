import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Loader2, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { z } from "zod";
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
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import logo from "@/assets/logo-achadinhos.png";

const PRICE_ID = "cheerdots_2_lote_promo";
const PRICE_BRL = 497;

const steps = [
  { id: 1, label: "Identificação", icon: ShieldCheck },
  { id: 2, label: "Entrega", icon: Truck },
  { id: 3, label: "Pagamento", icon: CreditCard },
] as const;

const STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identification, setIdentification] = useState<IdentificationData>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });
  const [shipping, setShipping] = useState<ShippingData>({
    zip: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [cepLoading, setCepLoading] = useState(false);

  // Init pixel + ViewContent on mount
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

  // CEP autofill via ViaCEP
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

  function validateStep(n: 1 | 2): boolean {
    try {
      if (n === 1) identificationSchema.parse(identification);
      else shippingSchema.parse(shipping);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errs: Record<string, string> = {};
        e.errors.forEach((er) => (errs[er.path[0] as string] = er.message));
        setErrors(errs);
      }
      return false;
    }
  }

  async function goToStep2() {
    if (!validateStep(1)) return;
    const evtId = `evt_${crypto.randomUUID()}`;
    setEventId(evtId);
    trackPixel(
      "Lead",
      {
        content_name: "Checkout — Identificação",
        value: PRICE_BRL,
        currency: "BRL",
      },
      { eventID: evtId },
    );
    setStep(2);
  }

  async function goToStep3() {
    if (!validateStep(2)) return;
    setCreating(true);
    const evtId = eventId || `evt_${crypto.randomUUID()}`;
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
          returnUrl: `${window.location.origin}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
          customer: identification,
          shipping,
          tracking: { eventId: evtId, fbp, fbc, ...utm },
        },
      });
      if (error || !data?.clientSecret) {
        throw new Error(error?.message || "Falha ao criar sessão de pagamento");
      }
      setClientSecret(data.clientSecret);
      setEventId(data.eventId || evtId);
      setStep(3);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro inesperado";
      setErrors({ submit: msg });
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PaymentTestModeBanner />

      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compra 100% segura</span>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-xl mx-auto">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                      done
                        ? "bg-indigo-500 border-indigo-500 text-white"
                        : active
                        ? "bg-indigo-500/15 border-indigo-500 text-indigo-300"
                        : "bg-white/5 border-white/10 text-slate-500"
                    }`}
                  >
                    {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-medium ${
                      active || done ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 -mt-5 ${done ? "bg-indigo-500" : "bg-white/10"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 max-w-5xl mx-auto">
          {/* Left: Form */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      Identificação
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                      Usaremos esses dados para o envio e atualização do pedido.
                    </p>
                  </div>
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
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="WhatsApp"
                      value={identification.phone}
                      onChange={(v) =>
                        setIdentification({ ...identification, phone: maskPhone(v) })
                      }
                      placeholder="(11) 91234-5678"
                      error={errors.phone}
                      autoComplete="tel"
                    />
                    <Field
                      label="CPF"
                      value={identification.cpf}
                      onChange={(v) =>
                        setIdentification({ ...identification, cpf: maskCpf(v) })
                      }
                      placeholder="000.000.000-00"
                      error={errors.cpf}
                    />
                  </div>
                  <PrimaryButton onClick={goToStep2}>Continuar para entrega</PrimaryButton>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      Endereço de entrega
                    </h1>
                    <p className="text-sm text-emerald-400 mt-1 flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> Frete grátis para todo o Brasil
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-[180px_1fr] gap-5">
                    <Field
                      label="CEP"
                      value={shipping.zip}
                      onChange={(v) => setShipping({ ...shipping, zip: maskCep(v) })}
                      placeholder="00000-000"
                      error={errors.zip}
                      hint={cepLoading ? "Buscando..." : undefined}
                      autoComplete="postal-code"
                    />
                    <Field
                      label="Rua / Avenida"
                      value={shipping.street}
                      onChange={(v) => setShipping({ ...shipping, street: v })}
                      error={errors.street}
                      autoComplete="address-line1"
                    />
                  </div>
                  <div className="grid sm:grid-cols-[140px_1fr] gap-5">
                    <Field
                      label="Número"
                      value={shipping.number}
                      onChange={(v) => setShipping({ ...shipping, number: v })}
                      error={errors.number}
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
                  <div className="grid sm:grid-cols-[1fr_120px] gap-5">
                    <Field
                      label="Cidade"
                      value={shipping.city}
                      onChange={(v) => setShipping({ ...shipping, city: v })}
                      error={errors.city}
                    />
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        UF
                      </label>
                      <select
                        value={shipping.state}
                        onChange={(e) =>
                          setShipping({ ...shipping, state: e.target.value })
                        }
                        className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">—</option>
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="text-xs text-red-400 mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>
                  {errors.submit && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      {errors.submit}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="h-12 px-5 rounded-full border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5"
                    >
                      Voltar
                    </button>
                    <PrimaryButton onClick={goToStep3} loading={creating}>
                      Ir para pagamento
                    </PrimaryButton>
                  </div>
                </motion.div>
              )}

              {step === 3 && clientSecret && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-5">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      Pagamento
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                      Pagamento seguro processado pela Stripe.
                    </p>
                  </div>
                  <div id="checkout" className="rounded-2xl overflow-hidden bg-white">
                    <EmbeddedCheckoutProvider
                      stripe={getStripe()}
                      options={{ fetchClientSecret: () => Promise.resolve(clientSecret) }}
                    >
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order summary */}
          <aside className="lg:sticky lg:top-6 self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5">
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.15em] text-center">
                  Lote Promocional — 50% OFF
                </p>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-2xl">
                    🖱️
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">CheerDots 2</p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Mouse 6-em-1 com IA · 1 unidade
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                  <Row label="Subtotal" value="R$ 997,00" strike />
                  <Row label="Desconto lote" value="-R$ 500,00" accent />
                  <Row label="Frete" value="Grátis" accent />
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-300 text-sm">Total à vista</span>
                    <span className="text-white text-2xl font-black tracking-tight">
                      R$ 497
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 text-right">
                    ou 12x de R$ 49,90 sem juros
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 bg-white/[0.02] border-t border-white/10 space-y-2">
                <Mini text="Garantia de 12 meses" />
                <Mini text="Suporte humanizado via WhatsApp" />
                <Mini text="Embalagem premium lacrada" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-1.5">
        {props.label}
      </label>
      <input
        type={props.type || "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        className={`w-full h-11 px-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
          props.error
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-indigo-500"
        }`}
      />
      {props.error && <p className="text-xs text-red-400 mt-1">{props.error}</p>}
      {!props.error && props.hint && (
        <p className="text-xs text-slate-500 mt-1">{props.hint}</p>
      )}
    </div>
  );
}

function PrimaryButton(props: {
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      className="w-full h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm shadow-[0_10px_40px_-10px_hsl(239_84%_67%/0.7)] hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
    >
      {props.loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {props.children}
    </button>
  );
}

function Row(props: { label: string; value: string; strike?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{props.label}</span>
      <span
        className={
          props.accent
            ? "text-emerald-400 font-medium"
            : props.strike
            ? "text-slate-500 line-through"
            : "text-white"
        }
      >
        {props.value}
      </span>
    </div>
  );
}

function Mini({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Check className="w-3 h-3 text-indigo-400" />
      <span>{text}</span>
    </div>
  );
}
