import { ShieldCheck, Truck, Headphones, Package, CreditCard } from "lucide-react";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { FadeIn } from "@/components/ui/FadeIn";

const benefits = [
  { icon: ShieldCheck, text: "Garantia de 12 meses" },
  { icon: Truck, text: "Frete grátis com rastreio completo" },
  { icon: Headphones, text: "Suporte humanizado via WhatsApp" },
  { icon: Package, text: "Embalagem premium lacrada" },
  { icon: CreditCard, text: "Parcelamento em até 12x sem juros" },
];

const PricingSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();

  return (
    <section id="oferta" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Oferta de lançamento
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Condição especial para{" "}
              <span className="text-gradient-blue">primeiros compradores</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-lg mx-auto">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden glow-primary">
              <div className="bg-gradient-to-r from-primary to-violet-500 p-3 text-center">
                <p className="text-white text-xs font-bold uppercase tracking-[0.15em]">
                  Lote Promocional — 50% OFF
                </p>
              </div>

              <div className="p-8 md:p-10 text-center">
                <p className="text-slate-400 line-through text-base mb-1">De R$ 997,00</p>
                <p className="text-6xl md:text-7xl font-black text-white tracking-tight mb-2">
                  R$ <span className="text-gradient-blue">497</span>
                </p>
                <p className="text-slate-400 text-sm font-light mb-2">
                  ou 12x de R$ 49,90 sem juros
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                  <span className="text-xs font-semibold text-emerald-400">Economia de R$ 500,00</span>
                </div>

                <div className="flex justify-center mb-8">
                  <ShimmerButton onClick={handleCheckoutRedirect} disabled={isRedirecting} size="lg" className="w-full">
                    {isRedirecting ? "Processando..." : "Garantir Lote com 50% OFF"}
                  </ShimmerButton>
                </div>

                <div className="space-y-3 text-left">
                  {benefits.map((b) => (
                    <div key={b.text} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <b.icon className="w-3 h-3 text-primary" />
                      </div>
                      <span className="font-light">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-5 font-light">
              Condição válida enquanto durar o lote promocional de lançamento no Brasil.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default PricingSection;
