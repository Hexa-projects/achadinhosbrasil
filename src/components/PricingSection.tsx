import { ShieldCheck, Truck, Clock } from "lucide-react";
import batteryStandby from "@/assets/battery-standby.jpg";

const PricingSection = () => (
  <section id="oferta" className="py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Lançamento Exclusivo no Brasil
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Oferta por <span className="text-gradient-cyan">Tempo Limitado</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Battery objection killer */}
          <div className="rounded-2xl overflow-hidden border border-border">
            <img
              src={batteryStandby}
              alt="20+ dias de bateria em standby - CheerDots 2"
              className="w-full h-auto object-cover"
            />
            <div className="bg-card p-5 text-center">
              <p className="text-lg font-semibold">Bateria que não te abandona</p>
              <p className="text-sm text-muted-foreground">20+ dias em standby, um dia inteiro de uso contínuo</p>
            </div>
          </div>

          {/* Pricing card */}
          <div className="bg-card border-2 border-primary/30 rounded-3xl p-8 md:p-10 glow-cyan text-center">
            <p className="text-muted-foreground line-through text-lg mb-1">De R$ 997,00</p>
            <p className="text-4xl md:text-5xl font-extrabold text-primary mb-1">
              12x de R$ 49,90
            </p>
            <p className="text-muted-foreground mb-6">ou R$ 497 à vista</p>

            <a
              href="#"
              className="block w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold animate-pulse-glow hover:brightness-110 transition-all mb-6"
            >
              Finalizar Compra Agora
            </a>

            <p className="text-sm text-destructive font-semibold flex items-center justify-center gap-1.5 mb-6">
              <Clock className="w-4 h-4" />
              Apenas 14 unidades restantes neste lote
            </p>

            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-accent" /> Garantia 12 meses</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-green-accent" /> Frete rastreável</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
