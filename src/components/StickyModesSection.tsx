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
    title: "Apresentador Laser",
    subtitle: "Apresentações corporativas",
    description:
      "Aponte para qualquer tela a até 20 metros de distância. O laser digital permite destacar áreas importantes durante reuniões de diretoria ou palestras.",
    image: presentationMode,
  },
  {
    id: "air",
    icon: Hand,
    title: "Air Mouse Integrado",
    subtitle: "Controle pelo ar",
    description:
      "Segure no ar e controle o cursor com movimentos naturais da mão. Possui giroscópio de 6 eixos com precisão cirúrgica. Ideal para quem não quer ficar preso à mesa.",
    image: airMouse,
  },
  {
    id: "desktop",
    icon: MonitorSmartphone,
    title: "Desktop Touchpad",
    subtitle: "Trabalho silencioso",
    description:
      "Junte as duas partes magnéticas e transforme-o em um touchpad portátil e silencioso. Sem cliques barulhentos irritando colegas de escritório.",
    image: magneticDesign,
  },
];

const StickyModesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-background border-t border-border/50">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3">
            3 Modos de Operação
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Um dispositivo, <span className="text-primary">infinitas possibilidades</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop: sticky layout */}
          <div className="hidden md:grid grid-cols-2 gap-12">
            <div className="space-y-6">
              {modes.map((mode, i) => (
                <motion.div
                  key={mode.id}
                  className={`rounded-2xl p-8 cursor-pointer transition-all duration-300 border ${
                    activeIndex === i
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-card border-border/60 hover:border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeIndex === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <mode.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">{mode.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {mode.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: sticky image */}
            <div className="sticky top-32 self-start">
              <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-xl aspect-square flex items-center justify-center bg-gray-50/50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modes[activeIndex].id}
                    src={modes[activeIndex].image}
                    alt={modes[activeIndex].title}
                    className="w-[90%] h-[90%] object-contain relative z-10 drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {modes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-10 bg-primary"
                        : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden space-y-8">
            {modes.map((mode, i) => (
              <motion.div
                key={mode.id}
                className="rounded-3xl overflow-hidden border border-border shadow-md bg-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-full aspect-square bg-gray-50 flex items-center justify-center p-6">
                  <img
                    src={mode.image}
                    alt={mode.title}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                      <mode.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">{mode.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {mode.description}
                  </p>
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
