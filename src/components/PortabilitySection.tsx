import { motion } from "framer-motion";
import designCompact from "@/assets/design-compact.webp";

const PortabilitySection = () => (
  <section className="py-24 relative overflow-hidden bg-white border-t border-border/50">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4">
            Leve para qualquer lugar
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            Portabilidade <span className="text-primary">Extrema</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium mb-10">
            Com apenas 70g e design magnético de bolso, o CheerDots 2 acompanha nômades digitais, executivos e empreendedores para qualquer lugar do mundo.
          </p>
          <div className="flex gap-10 bg-gray-50 border border-gray-100 p-6 rounded-2xl">
            <div>
              <p className="text-4xl font-black text-gray-900 tracking-tight">70g</p>
              <p className="text-sm text-primary font-bold uppercase tracking-wider mt-1">Ultra Leve</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <p className="text-4xl font-black text-gray-900 tracking-tight">6-em-1</p>
              <p className="text-sm text-primary font-bold uppercase tracking-wider mt-1">Funções</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-gray-50 flex items-center justify-center p-8 relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200/50 via-transparent to-transparent"></div>
          <img
            src={designCompact}
            alt="CheerDots 2 - design compacto de 70g cabe no bolso"
            className="w-full h-auto max-h-[450px] object-contain relative z-10 drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default PortabilitySection;
