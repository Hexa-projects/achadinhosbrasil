import heroProduct from "@/assets/hero-product.png";
import { Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";

const HeroSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  return (
  <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-white">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-primary font-semibold text-xs tracking-wide uppercase mb-6 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Lançamento Oficial
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 text-gray-900">
          O Mouse Evoluiu.<br className="hidden md:block" />{" "}
          <span className="text-primary">
            Assistente de IA de Bolso.
          </span>
        </h1>

        <motion.p
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
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
          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-bold transition-all hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            {isRedirecting ? "Redirecionando..." : "Garantir Lote Promocional"}
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-1 text-gray-900 font-bold">4.9/5</span>
            <span>(1.240)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Compra Segura</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-3xl overflow-hidden bg-white flex justify-center py-10">
           <img
            src={heroProduct}
            alt="CheerDots 2 - Design Completo com Laser e Touchpad"
            className="w-full max-w-3xl h-auto object-contain transform hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default HeroSection;
