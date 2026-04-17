import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const YOUTUBE_ID = "BeKNoXNdA4M";
const THUMB = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="relative py-14 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[120vw] h-[500px] rounded-full bg-indigo-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] max-w-[80vw] h-[400px] rounded-full bg-violet-500/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
            <p className="text-indigo-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Demonstração oficial
            </p>
            <h2 className="text-[1.85rem] leading-tight sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-50 text-balance">
              Veja o CheerDots 2{" "}
              <span className="text-gradient-blue">em ação</span>
            </h2>
            <p className="text-slate-300 text-[15px] md:text-lg mt-4 leading-relaxed font-light max-w-2xl mx-auto">
              90 segundos para entender como um único dispositivo substitui mouse, apresentador e gravador com IA.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-4xl mx-auto">
            {/* Premium frame */}
            <div className="relative rounded-[2rem] p-2 sm:p-3 bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-[0_30px_80px_-20px_hsl(239_84%_67%/0.45)]">
              <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-transparent to-violet-500/30 opacity-60 pointer-events-none" />

              <div
                className="relative aspect-video w-full rounded-[1.5rem] overflow-hidden cursor-pointer group bg-zinc-950"
                onClick={() => !isPlaying && setIsPlaying(true)}
              >
                {!isPlaying ? (
                  <>
                    <img
                      src={THUMB}
                      alt="Demonstração CheerDots 2 — mouse 6-em-1 com IA"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent" />

                    {/* Glassmorphism Play button */}
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative">
                        {/* Pulse rings */}
                        <span className="absolute inset-0 rounded-full bg-indigo-500/40 animate-ping" />
                        <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse" />

                        <button
                          aria-label="Reproduzir vídeo de demonstração do CheerDots 2"
                          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-[0_10px_40px_-5px_hsl(239_84%_67%/0.7)] transition-all duration-300 group-hover:bg-white/25 group-hover:border-white/50"
                        >
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                        </button>
                      </div>
                    </motion.div>

                    {/* Corner badge */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-medium text-white">Vídeo oficial</span>
                    </div>
                  </>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title="CheerDots 2 — Demonstração oficial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default VideoSection;
