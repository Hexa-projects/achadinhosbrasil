import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface RevealFeature {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

interface StickyImageRevealProps {
  features: RevealFeature[];
}

export const StickyImageReveal = ({ features }: StickyImageRevealProps) => {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
      {/* Left: Triggers */}
      <div className="flex flex-col gap-3 md:gap-4 order-2 md:order-1">
        {features.map((feature, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`text-left w-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? "bg-white/10 border-indigo-500/50 shadow-[0_0_30px_-5px_hsl(239_84%_67%/0.4)]"
                  : "bg-transparent border-white/5 hover:bg-white/[0.04] hover:border-white/10"
              }`}
            >
              {feature.badge && (
                <span
                  className={`inline-block text-[10px] uppercase tracking-[0.18em] font-semibold mb-2 ${
                    isActive ? "text-indigo-300" : "text-slate-500"
                  }`}
                >
                  {feature.badge}
                </span>
              )}
              <h3
                className={`text-xl sm:text-2xl font-bold mb-2 tracking-tight transition-colors ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm sm:text-base font-light leading-relaxed transition-colors ${
                  isActive ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {feature.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Right: Sticky Image Crossfade */}
      <div className="order-1 md:order-2 md:sticky md:top-28">
        <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_30px_80px_-20px_hsl(239_84%_67%/0.35)]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={active}
              src={features[active].image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              alt={features[active].title}
              loading="lazy"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
