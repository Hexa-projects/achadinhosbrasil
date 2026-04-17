import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { FadeIn } from "@/components/ui/FadeIn";

const HeroSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24">
      {/* Decorative grid + glow */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] max-w-[140vw] h-[600px] rounded-full bg-indigo-500/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] max-w-[80vw] h-[400px] rounded-full bg-violet-500/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-slate-100 mb-7"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse-glow" />
              <span className="text-slate-50">Lançamento Oficial no Brasil</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-[1.85rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold sm:leading-[1.05] tracking-tight mb-4 sm:mb-6 text-slate-50 text-balance">
              O cérebro do ChatGPT.{" "}
              <span className="text-gradient-blue">Na palma da sua mão.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-slate-300 text-[15px] md:text-lg lg:text-xl leading-relaxed mb-7 sm:mb-10 max-w-2xl mx-auto font-light text-balance">
              O primeiro hardware <span className="text-white font-medium">6-em-1</span> do mundo que transforma conversas em atas automáticas, controla suas apresentações e cabe no bolso.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-3 mb-8 sm:mb-14">
              <ShimmerButton onClick={handleCheckoutRedirect} disabled={isRedirecting} size="lg" className="w-full max-w-sm sm:w-auto">
                {isRedirecting ? "Redirecionando..." : "Garantir Lote com 50% OFF"}
              </ShimmerButton>
              <p className="text-xs sm:text-sm text-slate-400 font-light">
                Frete grátis com rastreio • 12x sem juros
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Floating product image */}
        <FadeIn delay={0.4}>
          <motion.div
            className="relative max-w-3xl mx-auto"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(239 84% 67% / 0.3) 0%, hsl(258 90% 66% / 0.12) 40%, transparent 70%)",
              }}
            />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_30px_80px_-20px_hsl(239_84%_67%/0.5)]">
              <img
                src="/lovable-uploads/hero-product.jpg"
                alt="CheerDots 2 com integração ChatGPT — hardware 6-em-1"
                className="relative w-full h-auto object-cover scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </FadeIn>

      </div>
    </section>
  );
};

export default HeroSection;
