import { ShieldCheck, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";
 
 
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
 
import batteryStandby from "@/assets/battery-standby.webp";
 

const PricingSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  return (
  <section id="oferta" className="py-24 relative overflow-hidden bg-background">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            Lançamento Exclusivo no Brasil
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Oferta por <span className="text-gradient-blue">Tempo Limitado</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Battery objection killer */}
          <motion.div
            className="rounded-2xl overflow-hidden border border-border shadow-sm bg-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={batteryStandby}
              alt="20+ dias de bateria em standby - CheerDots 2"
              className="w-full h-auto object-cover"
            />
            <div className="p-5 text-center">
              <p className="text-lg font-semibold text-foreground">Bateria que não te abandona</p>
              <p className="text-sm text-muted-foreground">20+ dias em standby, um dia inteiro de uso contínuo</p>
            </div>
          </motion.div>

          {/* Pricing card */}
          <motion.div
            className="rounded-2xl border-2 border-primary shadow-lg bg-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="p-8 md:p-10 text-center">
              <p className="text-muted-foreground line-through text-lg mb-1">De R$ 997,00</p>
              <p className="text-4xl md:text-5xl font-extrabold text-primary mb-1">
                12x de R$ 49,90
              </p>
              <p className="text-muted-foreground mb-8">ou R$ 497 à vista</p>

              <button
                onClick={handleCheckoutRedirect}
                disabled={isRedirecting}
                className="block w-full bg-primary text-primary-foreground py-4 rounded-lg text-lg font-bold hover:bg-primary/90 transition-all shadow-md mb-6 disabled:opacity-70"
              >
                {isRedirecting ? "Redirecionando..." : "Finalizar Compra Agora"}
              </button>

              <p className="text-sm text-destructive font-semibold flex items-center justify-center gap-1.5 mb-6">
                <Clock className="w-4 h-4" />
                Apenas 14 unidades restantes neste lote
              </p>

              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-accent" /> Garantia 12 meses</span>
                <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-green-accent" /> Frete rastreável</span>
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
