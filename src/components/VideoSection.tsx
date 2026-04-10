import { motion } from "framer-motion";

const VideoSection = () => (
  <section className="py-16 relative overflow-hidden section-alt">
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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Assista e <span className="text-gradient-blue">entenda tudo</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-border">
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
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-lg text-lg font-bold transition-all hover:bg-primary/90 shadow-md"
        >
          Garantir Lote com 50% OFF
        </a>
      </motion.div>
    </div>
  </section>
);

export default VideoSection;
