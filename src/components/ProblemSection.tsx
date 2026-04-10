import { AlertTriangle, Zap } from "lucide-react";

const ProblemSection = () => (
  <section className="py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
          <AlertTriangle className="w-4 h-4" />
          O problema que você ignora
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ainda perdendo horas digitando{" "}
          <span className="text-gradient-cyan">atas de reunião?</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
          Profissionais de alta performance não perdem tempo com anotações manuais. Eles automatizam.
        </p>
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-semibold mb-3">
            Aperte um botão. Pronto.
          </p>
          <p className="text-muted-foreground text-lg">
            O CheerDots 2 grava tudo, e a Inteligência Artificial cria o resumo perfeito para você em segundos.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
