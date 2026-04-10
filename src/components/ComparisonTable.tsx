import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Mouse Bluetooth / Touchpad", us: true, mouse: true, presenter: false },
  { feature: "Air Mouse (Giroscópio 6 eixos)", us: true, mouse: false, presenter: false },
  { feature: "Apresentador de Slides", us: true, mouse: false, presenter: true },
  { feature: "Ponteiro Laser Digital", us: true, mouse: false, presenter: true },
  { feature: "Gravação de Reuniões", us: true, mouse: false, presenter: false },
  { feature: "Transcrição com IA", us: true, mouse: false, presenter: false },
  { feature: "Resumo Executivo com IA", us: true, mouse: false, presenter: false },
  { feature: "Design Magnético 2-em-1", us: true, mouse: false, presenter: false },
  { feature: "Portabilidade (70g, bolso)", us: true, mouse: false, presenter: true },
  { feature: "Bateria 20+ dias standby", us: true, mouse: true, presenter: true },
  { feature: "Compatível Mac/Win", us: true, mouse: true, presenter: true },
];

const Cell = ({ value }: { value: boolean }) =>
  value ? (
    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
      <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
    </div>
  ) : (
    <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
  );

const ComparisonTable = () => (
  <section id="comparativo" className="py-24 relative overflow-hidden section-alt">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          Comparativo honesto
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          CheerDots 2 vs{" "}
          <span className="text-gradient-blue">soluções tradicionais</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] bg-secondary/50 border-b border-border/50">
          <div className="p-4 md:p-5 text-sm font-semibold text-muted-foreground">Funcionalidade</div>
          <div className="p-4 md:p-5 text-center">
            <p className="text-sm font-bold text-primary">CheerDots 2</p>
          </div>
          <div className="p-4 md:p-5 text-center">
            <p className="text-xs font-semibold text-muted-foreground">Mouse Comum</p>
          </div>
          <div className="p-4 md:p-5 text-center">
            <p className="text-xs font-semibold text-muted-foreground">Apresentador</p>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] ${
              i % 2 === 0 ? "bg-white" : "bg-secondary/20"
            } ${i < rows.length - 1 ? "border-b border-border/30" : ""}`}
          >
            <div className="p-4 md:p-5 flex items-center text-sm text-foreground font-medium">
              {row.feature}
            </div>
            <div className="p-4 md:p-5 flex items-center justify-center">
              <Cell value={row.us} />
            </div>
            <div className="p-4 md:p-5 flex items-center justify-center">
              <Cell value={row.mouse} />
            </div>
            <div className="p-4 md:p-5 flex items-center justify-center">
              <Cell value={row.presenter} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
