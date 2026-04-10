import { Mic, Mouse, Presentation, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.webp";
import touchControls from "@/assets/touch-controls.webp";
import heroProduct from "@/assets/hero-product.webp";

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
    image: heroProduct,
    imageAlt: "CheerDots 2 em modo Air Mouse",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Smartphone,
    title: "Scroller Inteligente",
    description: "Controle TikTok, Kindle e YouTube do sofá. Role páginas à distância.",
    image: touchControls,
    imageAlt: "CheerDots 2 controlando tela do celular",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Presentation,
    title: "Apresentador Premium",
    description: "Controle de slides avançado com ponteiro integrado e timer tátil. Perfeito para palestras.",
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
  <section className="py-24 relative bg-gray-50 border-t border-border/50">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3">
          1+1+1+1+1 = CheerDots 2
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          O Canivete Suíço da <span className="text-primary">Produtividade</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Card 1: IA - Grande */}
        <motion.div variants={cardVariants} className="lg:col-span-2 h-full">
          <div className="h-full bg-white rounded-3xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground leading-tight">Gravador com IA</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Aperte um botão, grave a reunião, e a Inteligência Artificial do ChatGPT cria a ata e o resumo automáticos para você no aplicativo.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-50 min-h-[250px] relative overflow-hidden">
               <img src={voiceRecording} alt="Gravador IA" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Card 2: Air Mouse - Vertical */}
        <motion.div variants={cardVariants} className="lg:col-span-1 h-full">
          <div className="h-full bg-white rounded-3xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Mouse className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground leading-tight">Air Mouse Magnético</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Controle o cursor por gestos no ar com o giroscópio.
              </p>
            </div>
            <div className="flex-grow mt-4 relative min-h-[200px]">
               <img src={heroProduct} alt="Air Mouse" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>

        {/* Card 3: Touchpad - Vertical */}
        <motion.div variants={cardVariants} className="lg:col-span-1 h-full">
          <div className="h-full bg-white rounded-3xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground leading-tight">Scroller de Lazer</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Role o TikTok, Kindle e YouTube direto do sofá.
              </p>
            </div>
            <div className="flex-grow mt-4 relative min-h-[200px] bg-gray-50">
               <img src={touchControls} alt="Touchpad e Scroller" className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
          </div>
        </motion.div>

        {/* Card 4: Apresentador - Horizontal Largo */}
        <motion.div variants={cardVariants} className="lg:col-span-2 h-full">
          <div className="h-full bg-primary rounded-3xl shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="p-8 flex flex-col justify-center relative z-10 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
                <Presentation className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white leading-tight">Apresentador Laser Digital</h3>
              <p className="text-primary-foreground/80 text-base leading-relaxed max-w-xl">
                Laser pointer digital integrado, marcação em tela e avanço de slides preciso. Transmita autoridade nas suas apresentações corporativas ou palestras acadêmicas.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  </section>
);

export default FeatureGrid;
