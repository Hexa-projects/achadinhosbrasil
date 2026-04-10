import { Mic, Mouse, Presentation, Smartphone, Hand, Crosshair } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.webp";
import magneticDesign from "@/assets/magnetic-design.png";
import scrollerMode from "@/assets/scroller-mode.webp";
import presentationMode from "@/assets/presentation-mode.webp";
import airMouse from "@/assets/air-mouse.png";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const features = [
  {
    icon: Mic,
    title: "Gravador Inteligente com IA",
    desc: "Aperte um botão, grave a reunião inteira. O software com ChatGPT integrado transcreve o áudio e gera atas e resumos automaticamente.",
    benefit: "Nunca mais perca um insight de reunião.",
    image: voiceRecording,
    wide: true,
  },
  {
    icon: Mouse,
    title: "Mouse Bluetooth",
    desc: "Na mesa, funciona como um touchpad preciso e silencioso. Design magnético que une as duas metades.",
    benefit: "Trabalho silencioso em qualquer superfície.",
    image: magneticDesign,
  },
  {
    icon: Hand,
    title: "Air Mouse",
    desc: "Destaque e mova o cursor no ar com giroscópio de 6 eixos. Controle natural e intuitivo.",
    benefit: "Liberdade para apresentar de pé.",
    image: airMouse,
  },
  {
    icon: Presentation,
    title: "Apresentador de Slides",
    desc: "Avance slides, volte páginas e controle apresentações a até 20 metros de distância via Bluetooth.",
    benefit: "Domine qualquer palco ou sala de reunião.",
    image: presentationMode,
    wide: true,
  },
  {
    icon: Crosshair,
    title: "Ponteiro Laser Digital",
    desc: "Destaque áreas da tela com precisão cirúrgica. Sem laser físico — funciona em qualquer projetor ou TV.",
    benefit: "Destaque o que importa na sua apresentação.",
  },
  {
    icon: Smartphone,
    title: "Scroller Remoto",
    desc: "Role TikTok, Kindle, YouTube e feeds do sofá. Use como controle remoto do celular ou tablet.",
    benefit: "Seu momento de descanso também merece conforto.",
    image: scrollerMode,
  },
];

const FeatureGrid = () => (
  <section id="funcoes" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          6 funções em 1 dispositivo
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Cada função resolve{" "}
          <span className="text-gradient-blue">um problema real</span>
        </h2>
        <p className="text-muted-foreground text-base mt-4 leading-relaxed">
          Não é sobre ter muitas funções. É sobre ter as funções certas para quem trabalha em movimento.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={cardVariants}
            className={`group bg-secondary/40 rounded-2xl border border-border/50 overflow-hidden hover:shadow-md hover:border-primary/15 transition-all duration-300 ${
              f.wide ? "md:col-span-2" : ""
            }`}
          >
            <div className={`flex flex-col ${f.wide && f.image ? "md:flex-row" : ""}`}>
              <div className={`p-8 ${f.wide && f.image ? "md:w-1/2" : ""} flex flex-col justify-center`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{f.desc}</p>
                <p className="text-primary text-sm font-semibold">{f.benefit}</p>
              </div>
              {f.image && (
                <div className={`${f.wide ? "md:w-1/2" : ""} bg-muted/30 flex items-center justify-center p-6 overflow-hidden`}>
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-auto max-h-[300px] object-contain"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeatureGrid;
