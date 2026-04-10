import { motion } from "framer-motion";
import designCompact from "@/assets/design-compact.jpg";

const PortabilitySection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            Leve para qualquer lugar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Portabilidade <span className="text-gradient-cyan">Extrema</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Com apenas 70g e tamanho de bolso, o CheerDots 2 acompanha nômades digitais, executivos e empreendedores para qualquer lugar do mundo.
          </p>
          <div className="flex gap-10">
            <div>
              <p className="text-4xl font-bold text-gradient-cyan">70g</p>
              <p className="text-sm text-muted-foreground mt-1">Ultra Leve</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gradient-cyan">6-em-1</p>
              <p className="text-sm text-muted-foreground mt-1">Funções</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden glass"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <img
            src={designCompact}
            alt="CheerDots 2 - design compacto de 70g cabe no bolso"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default PortabilitySection;
