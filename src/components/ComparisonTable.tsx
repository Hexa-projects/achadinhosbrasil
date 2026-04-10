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
  <section className="py-24 relative overflow-hidden bg-white border-t border-border/50">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3">
          A diferença é clara
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          CheerDots 2 <span className="text-primary">vs Outros</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_180px_180px] gap-0 mb-2">
          <div />
          <div className="bg-primary text-white rounded-t-2xl py-6 text-center relative shadow-lg z-10 scale-105 border-b-0">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Sua Escolha
            </div>
            <p className="text-lg md:text-xl font-black tracking-tight">CheerDots 2</p>
          </div>
          <div className="bg-gray-100 rounded-t-2xl py-6 text-center border-t border-l border-r border-gray-200 mt-2">
            <p className="text-base font-bold text-gray-500 uppercase tracking-wide">Comuns</p>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            className={`grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_180px_180px] gap-0 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <div className="py-4 px-6 flex items-center text-sm md:text-base text-gray-700 font-medium border-b border-gray-100">
              {row.feature}
            </div>
            <div className="py-4 flex items-center justify-center border-l-2 border-r-2 border-b border-primary/20 bg-blue-50/30 relative z-10 scale-105 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)]">
              {row.us ? (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              ) : (
                <X className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="py-4 flex items-center justify-center border-b border-r border-gray-200 bg-gray-50">
              {row.them ? (
                <Check className="w-5 h-5 text-gray-400" />
              ) : (
                <X className="w-5 h-5 text-gray-300" />
              )}
            </div>
          </motion.div>
        ))}

        {/* Bottom row */}
        <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_180px_180px] gap-0">
          <div />
          <div className="bg-primary text-primary-foreground rounded-b-2xl py-5 text-center relative z-10 scale-105 shadow-lg">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-100">O Único 6-em-1</p>
          </div>
          <div className="bg-gray-100 rounded-b-2xl py-5 text-center border-b border-l border-r border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Limitados</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
