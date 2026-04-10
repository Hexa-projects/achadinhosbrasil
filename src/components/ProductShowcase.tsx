import touchControls from "@/assets/touch-controls.jpg";
import designCompact from "@/assets/design-compact.jpg";
import batteryStandby from "@/assets/battery-standby.jpg";

const ProductShowcase = () => (
  <section className="py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Design que <span className="text-gradient-cyan">Impressiona</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="md:col-span-2 rounded-2xl overflow-hidden relative">
          <img src={touchControls} alt="Controles touch intuitivos do CheerDots 2" className="w-full h-64 md:h-80 object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden bg-card border border-border">
          <img src={designCompact} alt="Design compacto de 70g" className="w-full h-64 object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden bg-card border border-border">
          <img src={batteryStandby} alt="20+ dias de bateria em standby" className="w-full h-64 object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-10 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-gradient-cyan">70g</p>
          <p className="text-sm text-muted-foreground mt-1">Ultra Leve</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-gradient-cyan">20+</p>
          <p className="text-sm text-muted-foreground mt-1">Dias em Standby</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-gradient-cyan">6-em-1</p>
          <p className="text-sm text-muted-foreground mt-1">Funções</p>
        </div>
      </div>
    </div>
  </section>
);

export default ProductShowcase;
