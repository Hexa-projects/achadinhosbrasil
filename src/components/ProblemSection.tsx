import { AlertTriangle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.jpg";

const ProblemSection = () => (
  <section className="py-24 relative overflow-hidden bg-background">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            O problema que você ignora
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Ainda perdendo horas digitando{" "}
            <span className="text-gradient-blue">atas de reunião?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Profissionais de alta performance não perdem tempo com anotações manuais. Eles automatizam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-md border border-border"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={voiceRecording}
              alt="CheerDots 2 com integração ChatGPT - gravação e transcrição por IA"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            className="bg-secondary rounded-2xl p-8 md:p-10 border border-border"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Zap className="w-10 h-10 text-primary mb-4" />
            <p className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
              Aperte um botão. Pronto.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              O CheerDots 2 grava tudo, e a Inteligência Artificial cria o resumo perfeito para você em segundos.
            </p>
            <p className="text-sm text-primary font-medium">
              Integração nativa com ChatGPT — sem mensalidade extra.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
