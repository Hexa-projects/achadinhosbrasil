import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, MonitorSmartphone, Hand } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";
import touchControls from "@/assets/touch-controls.jpg";
import voiceRecording from "@/assets/voice-recording.jpg";

const modes = [
  {
    id: "laser",
    icon: Crosshair,
    title: "Laser Mode",
    subtitle: "Apresentações sem fio",
    description:
      "Laser pointer digital integrado com destaque de spotlight. Aponte para qualquer ponto da tela a até 20 metros de distância. Perfeito para salas de reunião e auditórios.",
    image: touchControls,
  },
  {
    id: "air",
    icon: Hand,
    title: "Air Mouse Mode",
    subtitle: "Controle pelo ar",
    description:
      "Segure no ar e controle o cursor com movimentos naturais da mão. Giroscópio de 6 eixos com precisão sub-milimétrica. Ideal para apresentações dinâmicas.",
    image: heroProduct,
  },
  {
    id: "desktop",
    icon: MonitorSmartphone,
    title: "Desktop Mode",
    subtitle: "Mouse magnético",
    description:
      "Encaixe as duas metades magneticamente e use como um trackpad de precisão sobre qualquer superfície. Sensor óptico de 1600 DPI para trabalho de mesa.",
    image: voiceRecording,
  },
];

const StickyModesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            3 Modos de Operação
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Um dispositivo, <span className="text-gradient-blue">infinitas possibilidades</span>
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
                      ? "bg-primary/5 border-primary/30 shadow-md"
                      : "bg-card border-border opacity-60 hover:opacity-90"
                  }`}
                  onClick={() => setActiveIndex(i)}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <mode.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{mode.title}</h3>
                      <p className="text-xs text-muted-foreground">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {mode.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: sticky image */}
            <div className="sticky top-32 self-start">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-md aspect-square flex items-center justify-center bg-secondary">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modes[activeIndex].id}
                    src={modes[activeIndex].image}
                    alt={modes[activeIndex].title}
                    className="w-full h-full object-cover relative z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {modes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-8 bg-primary"
                        : "w-3 bg-muted-foreground/30"
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
                className="rounded-2xl overflow-hidden border border-border shadow-sm bg-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <img
                  src={mode.image}
                  alt={mode.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <mode.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{mode.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
