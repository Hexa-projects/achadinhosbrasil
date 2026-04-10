import { Mic, Mouse, Presentation, Smartphone } from "lucide-react";
import voiceRecording from "@/assets/voice-recording.jpg";
import touchControls from "@/assets/touch-controls.jpg";
import productGallery from "@/assets/product-gallery.jpg";

const features = [
  {
    icon: Mic,
    title: "Gravador com IA",
    description: "Transcrição e resumos automáticos via ChatGPT. Fim das atas manuais.",
    image: voiceRecording,
    imageAlt: "Gravação de áudio com microfone de alta precisão integrado",
  },
  {
    icon: Mouse,
    title: "Air Mouse Magnético",
    description: "Controle o cursor por gestos no ar. Design 2-em-1 que se divide ao meio.",
    image: null,
    imageAlt: "",
  },
  {
    icon: Presentation,
    title: "Apresentador Laser",
    description: "Laser pointer digital integrado. Perfeito para palestras corporativas.",
    image: touchControls,
    imageAlt: "CheerDots 2 em modo apresentação sobre a mesa",
  },
  {
    icon: Smartphone,
    title: "Scroller de Lazer",
    description: "Controle TikTok, Kindle e YouTube do sofá. Role páginas à distância.",
    image: null,
    imageAlt: "",
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
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:glow-cyan"
          >
            {f.image && (
              <div className="h-44 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop authority image */}
      <div className="max-w-4xl mx-auto mt-10 rounded-2xl overflow-hidden border border-border">
        <img
          src={productGallery}
          alt="CheerDots 2 ao lado de MacBook — periférico premium para profissionais"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
);

export default FeatureGrid;
