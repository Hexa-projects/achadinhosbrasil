import { motion } from "framer-motion";

const VideoSection = () => (
  <section className="py-16 relative overflow-hidden">
    {/* Ambient glow behind video */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.07] rounded-full blur-[140px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-2">
          Veja em Ação
        </p>
        <h2 className="text-2xl md:text-3xl font-bold">
          Assista e <span className="text-gradient-cyan">entenda tudo</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="aspect-video rounded-3xl overflow-hidden glass-strong shadow-[0_0_80px_-15px_hsl(190_100%_50%/0.25)]">
          <iframe
            src="https://www.youtube.com/embed/BeKNoXNdA4M?rel=0&controls=1"
            title="CheerDots 2 — Vídeo de Apresentação"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a
          href="#oferta"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-bold transition-all hover:brightness-110 shadow-[0_0_30px_hsl(190_100%_50%/0.4),inset_0_1px_0_hsl(0_0%_100%/0.2)] animate-pulse-glow"
        >
          Garantir Lote com 50% OFF
        </a>
      </motion.div>
    </div>
  </section>
);

export default VideoSection;
