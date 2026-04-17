import { Check, X } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const rows = [
  { feature: "Mouse / Touchpad", us: true, mouse: true, presenter: false },
  { feature: "Air Mouse (Giroscópio)", us: true, mouse: false, presenter: false },
  { feature: "Apresentador de Slides", us: true, mouse: false, presenter: true },
  { feature: "Ponteiro Laser Digital", us: true, mouse: false, presenter: true },
  { feature: "Gravação de Reuniões", us: true, mouse: false, presenter: false },
  { feature: "Transcrição com IA", us: true, mouse: false, presenter: false },
  { feature: "Resumo com ChatGPT", us: true, mouse: false, presenter: false },
  { feature: "Design Magnético", us: true, mouse: false, presenter: false },
  { feature: "Portabilidade (70g)", us: true, mouse: false, presenter: true },
  { feature: "Bateria 20+ dias", us: true, mouse: true, presenter: true },
  { feature: "Mac & Windows", us: true, mouse: true, presenter: true },
];

const Cell = ({ value, highlight = false }: { value: boolean; highlight?: boolean }) =>
  value ? (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto ${
        highlight
          ? "bg-gradient-to-br from-primary to-violet-500 shadow-[0_0_15px_-3px_hsl(239_84%_67%/0.6)]"
          : "bg-emerald-500/15"
      }`}
    >
      <Check className={`w-4 h-4 ${highlight ? "text-white" : "text-emerald-400"}`} strokeWidth={3} />
    </div>
  ) : (
    <div className="w-7 h-7 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto">
      <X className="w-4 h-4 text-slate-500" strokeWidth={2} />
    </div>
  );

const ComparisonTable = () => (
  <section id="comparativo" className="relative py-14 md:py-28">
    <div className="container mx-auto px-4">
      <FadeIn>
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-4">
            Comparativo honesto
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            CheerDots 2 vs{" "}
            <span className="text-gradient-blue">soluções tradicionais</span>
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="max-w-4xl mx-auto overflow-x-auto -mx-4 px-4">
          <div className="min-w-[480px] rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_90px_90px_90px] md:grid-cols-[1.5fr_140px_140px_140px] border-b border-white/10">
              <div className="p-4 md:p-5 text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Funcionalidade
              </div>
              <div className="p-4 md:p-5 text-center bg-gradient-to-b from-primary/10 to-transparent">
                <p className="text-xs md:text-sm font-bold text-white leading-tight">CheerDots 2</p>
              </div>
              <div className="p-4 md:p-5 text-center">
                <p className="text-[10px] md:text-xs font-semibold text-slate-400 leading-tight">Mouse Comum</p>
              </div>
              <div className="p-4 md:p-5 text-center">
                <p className="text-[10px] md:text-xs font-semibold text-slate-400 leading-tight">Apresentador</p>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_90px_90px_90px] md:grid-cols-[1.5fr_140px_140px_140px] ${
                  i < rows.length - 1 ? "border-b border-white/5" : ""
                } hover:bg-white/[0.02] transition-colors`}
              >
                <div className="p-4 md:p-5 flex items-center text-xs md:text-sm text-slate-200 font-medium">
                  {row.feature}
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center bg-gradient-to-b from-primary/[0.04] to-transparent">
                  <Cell value={row.us} highlight />
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center">
                  <Cell value={row.mouse} />
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center">
                  <Cell value={row.presenter} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default ComparisonTable;
