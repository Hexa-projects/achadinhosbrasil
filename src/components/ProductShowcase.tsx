import touchControls from "@/assets/touch-controls.webp";
import designCompact from "@/assets/design-compact.webp";
import batteryStandby from "@/assets/battery-standby.webp";

const ProductShowcase = () => (
  <section className="py-20 section-alt">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Design que <span className="text-gradient-blue">Impressiona</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-border shadow-sm">
          <img src={touchControls} alt="Controles touch intuitivos do CheerDots 2" className="w-full h-auto object-contain" />
        </div>
        <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm">
          <img src={designCompact} alt="Design compacto de 70g" className="w-full h-auto object-contain" />
        </div>
        <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm">
          <img src={batteryStandby} alt="20+ dias de bateria em standby" className="w-full h-auto object-contain" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-10 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-primary">70g</p>
          <p className="text-sm text-muted-foreground mt-1">Ultra Leve</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-primary">20+</p>
          <p className="text-sm text-muted-foreground mt-1">Dias em Standby</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-primary">6-em-1</p>
          <p className="text-sm text-muted-foreground mt-1">Funções</p>
        </div>
      </div>
    </div>
  </section>
);

export default ProductShowcase;
