import { AlertTriangle, Zap, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import voiceRecording from "@/assets/voice-recording.webp";

const ProblemSection = () => (
  <section className="py-24 relative overflow-hidden bg-white border-t border-border/50">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <AlertTriangle className="w-4 h-4" />
            A Dor do Profissional Moderno
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            Ainda perdendo horas <br className="hidden md:block"/>digitando <span className="text-primary">atas de reunião?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Profissionais de alta performance não perdem tempo com anotações manuais. Eles delegam isso para a IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 bg-gray-50 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-xs font-bold text-gray-700 z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Gravando Reunião...
            </div>
            <img
              src={voiceRecording}
              alt="Integração ChatGPT - Gravação e transcrição"
              className="w-full h-[400px] object-cover object-left-top"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-70"></div>
               <Zap className="w-10 h-10 text-primary mb-4 relative z-10" />
               <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900 relative z-10">
                 Aperte um botão. Pronto.
               </h3>
               <p className="text-gray-600 text-lg leading-relaxed font-medium relative z-10">
                 O CheerDots 2 capta o áudio do ambiente, transcreve em tempo real e a Inteligência Artificial cria o resumo executivo perfeito para você em segundos.
               </p>
            </div>

            <div className="bg-gray-50 border border-gray-200/60 rounded-3xl p-8 flex items-start gap-4">
              <div className="mt-1 bg-white p-2 rounded-xl shadow-sm">
                <MousePointerClick className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Ecossistema ChatGPT Nativo</h4>
                <p className="text-gray-600 font-medium">Você tem acesso ao motor do ChatGPT-4 para transcrições e resumos dentro do próprio aplicativo do mouse, sem pagar mensalidades extras para a OpenAI.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
