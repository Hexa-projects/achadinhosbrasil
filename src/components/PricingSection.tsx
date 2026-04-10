import { ShieldCheck, Truck, Headphones, Package, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";

const benefits = [
  { icon: ShieldCheck, text: "Garantia de 12 meses" },
  { icon: Truck, text: "Frete com rastreio completo" },
  { icon: Headphones, text: "Suporte humanizado via WhatsApp" },
  { icon: Package, text: "Embalagem premium lacrada" },
  { icon: CreditCard, text: "Parcelamento em até 12x" },
];

const PricingSection = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  return (
    <section id="oferta" className="py-24 relative overflow-hidden section-alt">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            Oferta de lançamento
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Condição especial para{" "}
            <span className="text-gradient-blue">primeiros compradores</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl border border-border/50 shadow-lg overflow-hidden">
            <div className="bg-primary p-4 text-center">
              <p className="text-primary-foreground text-sm font-bold uppercase tracking-wider">
                Lote Promocional — 50% OFF
              </p>
            </div>

            <div className="p-8 md:p-10 text-center">
              <p className="text-muted-foreground line-through text-lg mb-1">De R$ 997,00</p>
              <p className="text-5xl md:text-6xl font-black text-foreground tracking-tight mb-1">
                R$ 497
              </p>
              <p className="text-muted-foreground text-sm font-medium mb-2">
                ou 12x de R$ 49,90 sem juros
              </p>
              <p className="text-xs text-green-600 font-semibold mb-8">
                Economia de R$ 500,00
              </p>

              <button
                onClick={handleCheckoutRedirect}
                disabled={isRedirecting}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mb-6 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isRedirecting ? "Processando..." : "Comprar com Desconto"}
              </button>

              <div className="space-y-3 text-left">
                {benefits.map((b) => (
                  <div key={b.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <b.icon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                    <span className="font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Condição válida enquanto durar o lote promocional de lançamento no Brasil.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
