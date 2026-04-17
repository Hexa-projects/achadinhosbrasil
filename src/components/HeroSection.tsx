import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { FadeIn } from "@/components/ui/FadeIn";

const HeroSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Decorative grid + glow */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-200 mb-7"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse-glow" />
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Lançamento Oficial no Brasil
              </span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-gradient-violet">
              O mouse evoluiu.
              <br />
              <span className="text-white/90">Sua produtividade também.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
              Mouse, touchpad, air mouse, apresentador, ponteiro laser e gravador com IA — tudo em <span className="text-white font-medium">70g</span> que cabe no bolso.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-3 mb-14">
              <ShimmerButton onClick={handleCheckoutRedirect} disabled={isRedirecting} size="lg">
                {isRedirecting ? "Redirecionando..." : "Garantir Lote com 50% OFF"}
              </ShimmerButton>
              <p className="text-sm text-slate-500 font-light">
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
            <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-violet-500/10 to-transparent blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(239 84% 67% / 0.25) 0%, hsl(258 90% 66% / 0.1) 40%, transparent 70%)" }} />
            <img
              src="https://cheerdots.com/cdn/shop/files/2048_aaeac6a8-c973-4cfb-b146-8562390970ca.png?v=1718094900&width=1200"
              alt="CheerDots 2 — Mouse inteligente 6-em-1 com IA"
              className="relative w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(99,102,241,0.4)]"
            />
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
