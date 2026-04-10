import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, MonitorSmartphone, Hand } from "lucide-react";
import heroProduct from "@/assets/hero-product.webp";
import touchControls from "@/assets/touch-controls.webp";
import productGallery from "@/assets/product-gallery.webp";

const modes = [
  {
    id: "laser",
    icon: Crosshair,
    title: "Laser Mode",
    subtitle: "Apresentações sem fio",
    description:
      "Laser pointer digital integrado com destaque de spotlight. Aponte para qualquer ponto da tela a até 20 metros de distância. Perfeito para salas de reunião e auditórios.",
    image: productGallery,
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
      "Encaixe as duas metades magneticamente e use como um trackpad de precisão sobre qualquer superfície. Sensor óptico com controle de gestos integrado.",
    image: touchControls,
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
                      <p className="text-sm text-muted-foreground font-medium">{mode.subtitle}</p>
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
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl aspect-square flex items-center justify-center bg-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modes[activeIndex].id}
                    src={modes[activeIndex].image}
                    alt={modes[activeIndex].title}
                    className="w-full h-full object-cover relative z-10"
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
                <img
                  src={mode.image}
                  alt={mode.title}
                  className="w-full aspect-square object-cover"
                />
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
