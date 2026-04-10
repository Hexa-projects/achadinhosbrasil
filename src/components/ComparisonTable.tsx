import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Air Mouse (Giroscópio 6 eixos)", us: true, them: false },
  { feature: "Gravador de Áudio com IA", us: true, them: false },
  { feature: "Transcrição ChatGPT integrada", us: true, them: false },
  { feature: "Laser Pointer Digital", us: true, them: true },
  { feature: "Apresentador de Slides", us: true, them: true },
  { feature: "Touchpad de Precisão", us: true, them: false },
  { feature: "Design Magnético 2-em-1", us: true, them: false },
  { feature: "Bateria 20+ dias standby", us: true, them: false },
  { feature: "Peso Ultra Leve (70g)", us: true, them: false },
  { feature: "Compatível Mac/Win/iOS", us: true, them: true },
];

const ComparisonTable = () => (
  <section className="py-24 relative overflow-hidden section-alt">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
          A diferença é clara
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          CheerDots 2 <span className="text-gradient-blue">vs Outros</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_140px_140px] gap-0 mb-1">
          <div />
          <div className="bg-primary text-primary-foreground rounded-t-xl py-4 text-center relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Melhor
            </div>
            <p className="text-sm font-bold">CheerDots 2</p>
          </div>
          <div className="bg-muted rounded-t-xl py-4 text-center border border-border">
            <p className="text-sm font-medium text-muted-foreground">Outros</p>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            className={`grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_140px_140px] gap-0 ${
              i % 2 === 0 ? "bg-background" : "bg-muted/50"
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <div className="py-3.5 px-4 flex items-center text-sm text-foreground border-b border-border">
              {row.feature}
            </div>
            <div className="py-3.5 flex items-center justify-center border-l border-r border-b border-primary/20 bg-primary/5">
              {row.us ? (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
              ) : (
                <X className="w-4 h-4 text-muted-foreground/40" />
              )}
            </div>
            <div className="py-3.5 flex items-center justify-center border-b border-border bg-muted/30">
              {row.them ? (
                <Check className="w-4 h-4 text-muted-foreground/50" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground/30" />
              )}
            </div>
          </motion.div>
        ))}

        {/* Bottom row */}
        <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_140px_140px] gap-0">
          <div />
          <div className="bg-primary text-primary-foreground rounded-b-xl py-4 text-center">
            <p className="text-xs font-bold">8/10 exclusivos</p>
          </div>
          <div className="bg-muted rounded-b-xl py-4 text-center border border-border border-t-0">
            <p className="text-xs text-muted-foreground">3/10 recursos</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
