import heroProduct from "@/assets/hero-product.jpg";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative overflow-hidden py-20 md:py-28 lg:py-36 bg-background">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Cheerdots 2 — 6 em 1
        </motion.p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7 text-foreground">
          O Mouse Evoluiu.{" "}
          <span className="text-gradient-blue">
            O 1º Assistente de IA de Bolso.
          </span>
        </h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Grava reuniões, transcreve áudios com ChatGPT, controla apresentações e telas à distância. O futuro da produtividade está nas suas mãos.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a
            href="#oferta"
            className="bg-primary text-primary-foreground px-10 py-4 rounded-lg text-lg font-bold transition-all hover:bg-primary/90 shadow-md"
          >
            Garantir Lote Promocional
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4 mt-7 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1 font-semibold text-foreground">4.9/5</span>
          </span>
          <span>(1.240 Avaliações)</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Compra Segura</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.9, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={heroProduct}
          alt="CheerDots 2 - Mouse com Inteligência Artificial"
          className="w-full rounded-2xl shadow-lg"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
