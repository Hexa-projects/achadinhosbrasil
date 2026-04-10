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
  <section className="py-24 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          CheerDots 2 <span className="text-gradient-cyan">vs Outros</span>
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
        <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_140px_140px] gap-0 mb-2">
          <div />
          <div className="glass-strong rounded-t-2xl py-4 text-center glow-cyan relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Melhor
            </div>
            <p className="text-sm font-bold text-primary">CheerDots 2</p>
          </div>
          <div className="bg-muted/30 rounded-t-2xl py-4 text-center border border-border/50">
            <p className="text-sm font-medium text-muted-foreground">Outros</p>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            className={`grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_140px_140px] gap-0 ${
              i % 2 === 0 ? "" : "bg-muted/5"
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <div className="py-3.5 px-4 flex items-center text-sm text-foreground/90 border-b border-border/20">
              {row.feature}
            </div>
            <div className="py-3.5 flex items-center justify-center border-l border-r border-b border-primary/10 bg-primary/[0.03]">
              {row.us ? (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
              ) : (
                <X className="w-4 h-4 text-muted-foreground/40" />
              )}
            </div>
            <div className="py-3.5 flex items-center justify-center border-b border-border/20 bg-muted/10">
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
          <div className="glass-strong rounded-b-2xl py-4 text-center glow-cyan">
            <p className="text-xs font-bold text-primary">8/10 exclusivos</p>
          </div>
          <div className="bg-muted/30 rounded-b-2xl py-4 text-center border border-border/50 border-t-0">
            <p className="text-xs text-muted-foreground">3/10 recursos</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
