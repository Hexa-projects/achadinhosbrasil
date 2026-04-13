import { motion } from "framer-motion";
import { Weight, Ruler, Battery, Bluetooth, Usb, Monitor, Cpu, Layers } from "lucide-react";

const CDN = "https://cdn.shopify.com/s/files/1/0577/3076/0913/files";

const specs = [
  { icon: Weight, label: "Peso", value: "~70g" },
  { icon: Ruler, label: "Dimensões", value: "Compacto — cabe no bolso" },
  { icon: Layers, label: "Modos de uso", value: "Desktop, Air Mouse, Apresentador, Gravador" },
  { icon: Battery, label: "Bateria", value: "20+ dias standby" },
  { icon: Usb, label: "Carregamento", value: "USB-C" },
  { icon: Bluetooth, label: "Conectividade", value: "Bluetooth 5.0+" },
  { icon: Monitor, label: "Compatibilidade", value: "macOS 10.15+, Windows 10/11" },
  { icon: Cpu, label: "Recursos de IA", value: "ChatGPT integrado via software" },
];

const SpecsSection = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-14 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          Especificações técnicas
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Detalhes que <span className="text-gradient-blue">importam</span>
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          className="bg-secondary/40 rounded-2xl border border-border/50 overflow-hidden"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-4 px-6 md:px-8 py-5 ${
                i < specs.length - 1 ? "border-b border-border/40" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
              </div>
              <p className="text-sm text-muted-foreground font-medium text-right">{s.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-secondary/30"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src={`${CDN}/9fcf4ef1ea6bd08d8383af75b9b0a57a_500x.png?v=1734879148`}
            alt="Diferenças entre CheerDots 2 Basic, Recording e Advanced"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6 max-w-lg mx-auto">
        * Os recursos de transcrição, resumo e gravação com IA funcionam através do software CheerPod, disponível para macOS e Windows. Não requerem assinatura do ChatGPT.
      </p>
    </div>
  </section>
);

export default SpecsSection;
