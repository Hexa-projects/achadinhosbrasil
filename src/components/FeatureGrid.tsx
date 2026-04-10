import { Mic, Mouse, Presentation, Smartphone } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Gravador com IA",
    description: "Transcrição e resumos automáticos via ChatGPT. Fim das atas manuais.",
  },
  {
    icon: Mouse,
    title: "Air Mouse Magnético",
    description: "Controle o cursor por gestos no ar. Design 2-em-1 que se divide ao meio.",
  },
  {
    icon: Presentation,
    title: "Apresentador Laser",
    description: "Laser pointer digital integrado. Perfeito para palestras corporativas.",
  },
  {
    icon: Smartphone,
    title: "Scroller de Lazer",
    description: "Controle TikTok, Kindle e YouTube do sofá. Role páginas à distância.",
  },
];

const FeatureGrid = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          1+1+1+1+1 = CheerDots 2
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          O Canivete Suíço da <span className="text-gradient-cyan">Produtividade</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:glow-cyan"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
