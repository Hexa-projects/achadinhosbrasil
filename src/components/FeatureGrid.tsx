import { Mic, Mouse, Presentation, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.webp";
import magneticDesign from "@/assets/magnetic-design.png";
import scrollerMode from "@/assets/scroller-mode.webp";
import presentationMode from "@/assets/presentation-mode.webp";

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
               <img src={voiceRecording} alt="Gravador IA em Português" className="absolute inset-0 w-full h-full object-cover" />
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
              <h3 className="text-2xl font-bold mb-3 text-foreground leading-tight">Design Magnético</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                O corpo se divide ao meio para virar um Air Mouse ultra-leve.
              </p>
            </div>
            <div className="flex-grow mt-4 relative min-h-[200px] flex items-center justify-center">
               <img src={magneticDesign} alt="Design Magnético" className="w-[80%] h-auto object-contain drop-shadow-xl" />
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
            <div className="flex-grow relative min-h-[200px] bg-gray-50">
               <img src={scrollerMode} alt="Touchpad e Scroller" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>

        {/* Card 4: Apresentador - Horizontal Largo */}
        <motion.div variants={cardVariants} className="lg:col-span-2 h-full">
          <div className="h-full bg-white rounded-3xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
            <div className="p-8 flex flex-col justify-center relative z-10 w-full md:w-1/2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Presentation className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground leading-tight">Apresentador Laser Digital</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Laser pointer digital integrado, marcação em tela e avanço de slides preciso. Transmita autoridade nas suas apresentações.
              </p>
            </div>
            <div className="relative md:w-1/2 min-h-[250px] bg-gray-50">
               <img src={presentationMode} alt="Apresentador Mode" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  </section>
);

export default FeatureGrid;
