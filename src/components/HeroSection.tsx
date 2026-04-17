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
            <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-slate-50">
              O mouse evoluiu.
              <br />
              <span className="text-gradient-blue">Sua produtividade também.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
              Mouse, touchpad, air mouse, apresentador, ponteiro laser e gravador com IA — tudo em <span className="text-white font-medium">70g</span> que cabe no bolso.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-3 mb-10 sm:mb-14">
              <ShimmerButton onClick={handleCheckoutRedirect} disabled={isRedirecting} size="lg">
                {isRedirecting ? "Redirecionando..." : "Garantir Lote com 50% OFF"}
              </ShimmerButton>
              <p className="text-sm text-slate-400 font-light">
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
            <img
              src="https://cheerdots.com/cdn/shop/files/2048_aaeac6a8-c973-4cfb-b146-8562390970ca.png?v=1718094900&width=1200"
              alt="CheerDots 2 — Mouse inteligente 6-em-1 com IA"
              className="relative w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(99,102,241,0.45)]"
              loading="eager"
            />
          </motion.div>
        </FadeIn>

        {/* Secondary lifestyle image */}
        <FadeIn delay={0.5}>
          <div className="mt-12 md:mt-16 max-w-md sm:max-w-lg mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-2 shadow-[0_20px_60px_-20px_rgba(99,102,241,0.4)]">
              <img
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop"
                alt="Tecnologia de produtividade premium"
                className="w-full h-auto object-cover rounded-2xl animate-[pulse_4s_ease-in-out_infinite]"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
