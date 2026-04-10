import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, MonitorSmartphone, Hand } from "lucide-react";
import airMouse from "@/assets/air-mouse.png";
import presentationMode from "@/assets/presentation-mode.webp";
import magneticDesign from "@/assets/magnetic-design.png";

const modes = [
  {
    id: "laser",
    icon: Crosshair,
    title: "Modo Apresentação",
    subtitle: "Reuniões e palestras",
    description:
      "Controle slides, aponte com laser digital e domine a atenção da audiência a até 20 metros. Sem fios, sem complicação.",
    image: presentationMode,
  },
  {
    id: "air",
    icon: Hand,
    title: "Modo Air Mouse",
    subtitle: "Controle pelo ar",
    description:
      "Giroscópio de 6 eixos para mover o cursor com movimentos naturais da mão. Ideal para apresentações de pé ou controle à distância.",
    image: airMouse,
  },
  {
    id: "desktop",
    icon: MonitorSmartphone,
    title: "Modo Desktop",
    subtitle: "Touchpad silencioso",
    description:
      "Junte as duas partes magnéticas e use como touchpad portátil e silencioso. Perfeito para escritórios, bibliotecas e trabalho focado.",
    image: magneticDesign,
  },
];

const StickyModesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="modos" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            3 Modos de Operação
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Um dispositivo.{" "}
            <span className="text-gradient-blue">Três formas de trabalhar.</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop */}
          <div className="hidden md:grid grid-cols-2 gap-10">
            <div className="space-y-4">
              {modes.map((mode, i) => (
                <motion.div
                  key={mode.id}
                  className={`rounded-2xl p-7 cursor-pointer transition-all duration-300 border ${
                    activeIndex === i
                      ? "bg-primary/5 border-primary/30 shadow-sm"
                      : "bg-secondary/30 border-border/50 hover:bg-secondary/60"
                  }`}
                  onClick={() => setActiveIndex(i)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeIndex === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      <mode.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{mode.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mode.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="sticky top-32 self-start">
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-md aspect-square flex items-center justify-center bg-secondary/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modes[activeIndex].id}
                    src={modes[activeIndex].image}
                    alt={modes[activeIndex].title}
                    className="w-[85%] h-[85%] object-contain drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {modes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i ? "w-8 bg-primary" : "w-3 bg-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-6">
            {modes.map((mode, i) => (
              <motion.div
                key={mode.id}
                className="rounded-2xl overflow-hidden border border-border/50 bg-white shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-full aspect-[4/3] bg-secondary/30 flex items-center justify-center p-6">
                  <img src={mode.image} alt={mode.title} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                      <mode.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{mode.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">{mode.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyModesSection;
