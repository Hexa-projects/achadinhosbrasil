import { Zap, Clock, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.webp";

const ProblemSection = () => (
  <section className="py-24 relative overflow-hidden section-alt">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold text-foreground z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Gravando...
            </div>
            <img
              src={voiceRecording}
              alt="Gravação de reunião com transcrição IA"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            O problema
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-foreground tracking-tight leading-tight">
            Você ainda perde tempo{" "}
            <span className="text-gradient-blue">anotando reuniões manualmente?</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            Profissionais gastam horas por semana digitando atas, perdendo detalhes e retrabalho. O CheerDots 2 resolve isso em um clique.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Gravação instantânea</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Um botão. O microfone capta o ambiente e a IA transcreve em tempo real.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MousePointerClick className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Resumo com ChatGPT integrado</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  O software do CheerDots 2 usa ChatGPT para gerar atas e resumos executivos — sem pagar mensalidade extra.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Horas de volta por semana</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Delegue a anotação para a IA. Foque na conversa que importa.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
