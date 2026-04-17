import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Wand2, Presentation } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const modes = [
  {
    id: "desktop",
    label: "Modo Desktop",
    icon: Monitor,
    title: "Touchpad de precisão no seu bolso",
    description:
      "Apoie a base e use como mouse Bluetooth. Toque, deslize e use gestos multitoque iguais aos de um trackpad premium — em qualquer superfície.",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "air",
    label: "Modo Air Mouse",
    icon: Wand2,
    title: "Controle pelo ar com sensores 6-axis",
    description:
      "Levante o CheerDots e mova o cursor com gestos naturais. Ideal para apresentações de pé, salas de aula e demos a distância.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "present",
    label: "Modo Apresentação",
    icon: Presentation,
    title: "Spotlight, laser e caneta digital",
    description:
      "Avance slides, destaque trechos com spotlight, aponte com laser virtual ou desenhe sobre a tela em tempo real. Seu pitch nunca mais será o mesmo.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  },
];

const StickyModesSection = () => {
  const [active, setActive] = useState(modes[0].id);
  const current = modes.find((m) => m.id === active)!;

  return (
    <section id="modos" className="relative py-14 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
            <p className="text-indigo-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Modos de operação
            </p>
            <h2 className="text-[1.75rem] leading-tight sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
              Três dispositivos.{" "}
              <span className="text-gradient-blue">Um só hardware.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Tabs — horizontally scrollable on tiny screens */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-8 md:mb-10 px-1">
            <div className="inline-flex flex-wrap justify-center items-center gap-1.5 p-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md max-w-full">
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = m.id === active;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActive(m.id)}
                    className={`relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="modes-active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_20px_-2px_hsl(239_84%_67%/0.6)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-50 mb-4">
                  {current.title}
                </h3>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
                  {current.description}
                </p>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-indigo-500/25 to-violet-500/15 blur-3xl pointer-events-none" />
                <img
                  src={current.image}
                  alt={current.title}
                  className="relative w-full aspect-video md:aspect-square object-cover rounded-3xl border border-white/10"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StickyModesSection;
