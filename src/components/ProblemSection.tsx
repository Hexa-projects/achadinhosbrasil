import { AlertTriangle, Zap } from "lucide-react";
import voiceRecording from "@/assets/voice-recording.jpg";

const ProblemSection = () => (
  <section className="py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            O problema que você ignora
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ainda perdendo horas digitando{" "}
            <span className="text-gradient-cyan">atas de reunião?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Profissionais de alta performance não perdem tempo com anotações manuais. Eles automatizam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-border">
            <img
              src={voiceRecording}
              alt="CheerDots 2 com integração ChatGPT - gravação e transcrição por IA"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <p className="text-xl md:text-2xl font-semibold mb-3">
              Aperte um botão. Pronto.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              O CheerDots 2 grava tudo, e a Inteligência Artificial cria o resumo perfeito para você em segundos.
            </p>
            <p className="text-sm text-primary font-medium">
              Integração nativa com ChatGPT — sem mensalidade extra.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
