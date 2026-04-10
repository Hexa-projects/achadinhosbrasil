import { ShieldCheck, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import batteryStandby from "@/assets/battery-standby.webp";

const PricingSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  return (
  <section id="oferta" className="py-24 relative overflow-hidden bg-gray-50 border-t border-border/50">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-primary font-bold text-xs tracking-wide uppercase mb-6 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Lançamento Exclusivo no Brasil
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Oferta por <span className="text-primary">Tempo Limitado</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Battery objection killer */}
          <motion.div
            className="rounded-3xl overflow-hidden border border-border/60 shadow-md bg-white flex flex-col"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex-grow bg-gray-50 relative min-h-[300px]">
              <img
                src={batteryStandby}
                alt="20+ dias de bateria em standby - CheerDots 2"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-8 text-center bg-white border-t border-border/30">
              <h3 className="text-2xl font-bold text-foreground mb-2">Bateria que não te abandona</h3>
              <p className="text-base text-muted-foreground font-medium">Até 25 dias em standby. Funciona por semanas com uma única carga magnética rápida.</p>
            </div>
          </motion.div>

          {/* Pricing card */}
          <motion.div
            className="rounded-3xl border-2 border-primary shadow-xl bg-white relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="absolute top-0 inset-x-0 h-2 bg-primary"></div>
            <div className="p-8 md:p-12 text-center flex flex-col h-full justify-center">
              
              <div className="mb-8">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Desconto de 50% Ativado
                </span>
                <p className="text-muted-foreground line-through text-xl font-medium mb-2">De R$ 997,00</p>
                <p className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-2">
                  12x R$ 49<span className="text-3xl">,90</span>
                </p>
                <p className="text-muted-foreground font-medium">ou R$ 497 à vista (PIX com 5% OFF)</p>
              </div>

              <button
                onClick={handleCheckoutRedirect}
                disabled={isRedirecting}
                className="block w-full bg-primary text-white py-5 rounded-xl text-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mb-6 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                {isRedirecting ? "Processando..." : "Finalizar Compra Segura"}
              </button>

              <div className="bg-red-50 text-red-700 rounded-lg p-3 flex items-center justify-center gap-2 mb-8 border border-red-100">
                <Clock className="w-5 h-5 animate-pulse" />
                <span className="font-bold text-sm uppercase tracking-wide">Apenas 14 unidades restantes no lote</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 font-medium pt-6 border-t border-gray-100">
                <span className="flex items-center justify-center gap-2"><ShieldCheck className="w-5 h-5 text-green-600" /> Garantia 12 meses</span>
                <span className="flex items-center justify-center gap-2"><Truck className="w-5 h-5 text-blue-600" /> Frete Grátis BR</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PricingSection;
