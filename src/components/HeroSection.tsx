import heroProduct from "@/assets/hero-product.png";
import { Star, ShieldCheck, Truck, CreditCard, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";

const trustBadges = [
  { icon: ShieldCheck, label: "Garantia 12 meses" },
  { icon: Truck, label: "Frete com rastreio" },
  { icon: CreditCard, label: "12x sem juros" },
  { icon: Monitor, label: "Mac & Windows" },
];

const HeroSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  return (
    <section className="relative overflow-hidden pt-24 pb-12 md:pt-36 md:pb-24 bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary font-semibold text-xs tracking-wide uppercase mb-6 border border-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Lançamento Oficial no Brasil
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight mb-5 text-foreground">
              O mouse evoluiu.{" "}
              <span className="text-gradient-blue">
                Sua produtividade também.
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Mouse, touchpad, air mouse, apresentador de slides, ponteiro laser e gravador com IA — tudo em um dispositivo de 70g que cabe no bolso.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-8">
              <button
                onClick={handleCheckoutRedirect}
                disabled={isRedirecting}
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isRedirecting ? "Redirecionando..." : "Comprar com 50% OFF"}
              </button>
              <a
                href="#funcoes"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-foreground border border-border hover:bg-muted/50 transition-all"
              >
                Ver Funções
              </a>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">(1.240+ avaliações)</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <b.icon className="w-4 h-4 text-primary/70 flex-shrink-0" />
                  <span className="font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl bg-secondary/50 p-8 flex justify-center items-center">
              <img
                src={heroProduct}
                alt="CheerDots 2 — Assistente de Produtividade Portátil"
                className="w-full max-w-md h-auto object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
