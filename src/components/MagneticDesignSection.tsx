import { GlareCard } from "@/components/ui/GlareCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { Magnet } from "lucide-react";

const MagneticDesignSection = () => {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute -top-40 left-1/4 w-[500px] max-w-[80vw] h-[500px] rounded-full bg-violet-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] max-w-[70vw] h-[400px] rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <FadeIn>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-violet-300 mb-5">
                <Magnet className="w-3.5 h-3.5" />
                Design Magnético
              </div>
              <h2 className="font-sora font-semibold tracking-[-0.02em] leading-[1.05] text-[2rem] sm:text-4xl md:text-5xl text-slate-50 mb-5 text-balance">
                Dois mundos.{" "}
                <span className="text-gradient-blue">Um clique magnético.</span>
              </h2>
              <p className="font-inter font-normal text-slate-300 text-base md:text-[17px] leading-relaxed text-balance">
                Uma engenharia de precisão. Na mesa, um mouse bluetooth. Separe as
                metades magnéticas e ele se transforma no{" "}
                <span className="text-white font-semibold">touchpad portátil mais fino já criado.</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlareCard
              imageUrl="https://img.youtube.com/vi/dErz21ioikA/maxresdefault.jpg"
              alt="CheerDots 2 dividido magneticamente ao meio"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-violet-300 font-semibold">
                Engenharia · 2024
              </span>
              <p className="text-white text-lg sm:text-xl font-medium mt-2 max-w-xs">
                Atrai, conecta e se transforma — sem fios, sem fricção.
              </p>
            </GlareCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default MagneticDesignSection;
