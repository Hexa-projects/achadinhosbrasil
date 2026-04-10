import designCompact from "@/assets/design-compact.jpg";

const PortabilitySection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Leve para qualquer lugar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Portabilidade <span className="text-gradient-cyan">Extrema</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Com apenas 70g e tamanho de bolso, o CheerDots 2 acompanha nômades digitais, executivos e empreendedores para qualquer lugar do mundo.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-gradient-cyan">70g</p>
              <p className="text-sm text-muted-foreground">Ultra Leve</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gradient-cyan">6-em-1</p>
              <p className="text-sm text-muted-foreground">Funções</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border">
          <img
            src={designCompact}
            alt="CheerDots 2 - design compacto de 70g cabe no bolso"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default PortabilitySection;
