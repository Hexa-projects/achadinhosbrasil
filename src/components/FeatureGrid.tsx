import { Mic, Mouse, Presentation, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.webp";
import touchControls from "@/assets/touch-controls.webp";
import productGallery from "@/assets/product-gallery.webp";

const features = [
  {
    icon: Mic,
    title: "Gravador com IA",
    description: "Transcrição e resumos automáticos via ChatGPT. Fim das atas manuais.",
    image: voiceRecording,
    imageAlt: "Gravação de áudio com microfone de alta precisão integrado",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    icon: Mouse,
    title: "Air Mouse Magnético",
    description: "Controle o cursor por gestos no ar. Design 2-em-1 que se divide ao meio.",
    image: null,
    imageAlt: "",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Presentation,
    title: "Apresentador Laser",
    description: "Laser pointer digital integrado. Perfeito para palestras corporativas.",
    image: touchControls,
    imageAlt: "CheerDots 2 em modo apresentação sobre a mesa",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Smartphone,
    title: "Scroller de Lazer",
    description: "Controle TikTok, Kindle e YouTube do sofá. Role páginas à distância.",
    image: null,
    imageAlt: "",
    span: "md:col-span-2 md:row-span-1",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const FeatureGrid = () => (
  <section className="py-24 relative section-alt">
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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          O Canivete Suíço da <span className="text-gradient-blue">Produtividade</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={cardVariants} className={f.span}>
            <div className="h-full overflow-hidden bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
              {f.image && (
                <div className={`overflow-hidden ${f.span.includes("col-span-2") ? "h-52" : "h-40"}`}>
                  <img
                    src={f.image}
                    alt={f.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-7">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1.5 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-md border border-border"
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
