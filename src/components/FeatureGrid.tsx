import { Mic, Mouse, Presentation, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.jpg";
import touchControls from "@/assets/touch-controls.jpg";
import productGallery from "@/assets/product-gallery.jpg";
import TiltCard from "./TiltCard";

const features = [
  {
    icon: Mic,
    title: "Gravador com IA",
    description: "Transcrição e resumos automáticos via ChatGPT. Fim das atas manuais.",
    image: voiceRecording,
    imageAlt: "Gravação de áudio com microfone de alta precisão integrado",
  },
  {
    icon: Mouse,
    title: "Air Mouse Magnético",
    description: "Controle o cursor por gestos no ar. Design 2-em-1 que se divide ao meio.",
    image: null,
    imageAlt: "",
  },
  {
    icon: Presentation,
    title: "Apresentador Laser",
    description: "Laser pointer digital integrado. Perfeito para palestras corporativas.",
    image: touchControls,
    imageAlt: "CheerDots 2 em modo apresentação sobre a mesa",
  },
  {
    icon: Smartphone,
    title: "Scroller de Lazer",
    description: "Controle TikTok, Kindle e YouTube do sofá. Role páginas à distância.",
    image: null,
    imageAlt: "",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const FeatureGrid = () => (
  <section className="py-24 relative">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
          1+1+1+1+1 = CheerDots 2
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          O Canivete Suíço da <span className="text-gradient-cyan">Produtividade</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        style={{ perspective: "1200px" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={cardVariants}>
            <TiltCard className="h-full overflow-hidden">
              {f.image && (
                <div className="h-44 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop authority image */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden glass"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src={productGallery}
          alt="CheerDots 2 ao lado de MacBook — periférico premium para profissionais"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  </section>
);

export default FeatureGrid;
