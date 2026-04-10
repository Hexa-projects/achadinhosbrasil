import { motion } from "framer-motion";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";

const VideoSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  return (
    <section className="py-20 relative overflow-hidden section-alt">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-2">
            Demonstração
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Veja o CheerDots 2 <span className="text-gradient-blue">em ação</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-border bg-foreground/5">
            <iframe
              src="https://www.youtube.com/embed/BeKNoXNdA4M?rel=0&controls=1"
              title="CheerDots 2 — Demonstração Completa"
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
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting}
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-xl text-base font-bold transition-all hover:bg-primary/90 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {isRedirecting ? "Redirecionando..." : "Garantir Lote com 50% OFF"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
