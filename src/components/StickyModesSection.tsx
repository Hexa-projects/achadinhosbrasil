import { FadeIn } from "@/components/ui/FadeIn";
import { StickyImageReveal, RevealFeature } from "@/components/ui/StickyImageReveal";

const modes: RevealFeature[] = [
  {
    badge: "Modo 1 · Gravador IA",
    title: "Reuniões sem anotações",
    description:
      "Grave o ambiente e a IA gera resumos acionáveis na hora. Transcrição precisa, atas prontas e tópicos destacados em segundos.",
    image: "https://img.youtube.com/vi/T-WwWcun2uY/maxresdefault.jpg",
  },
  {
    badge: "Modo 2 · Apresentador",
    title: "Domine o palco",
    description:
      "Avanço de slides, Air Mouse com giroscópio e ponteiro laser digital. Movimente-se livremente sem perder o controle da apresentação.",
    image: "https://img.youtube.com/vi/bZ1XmvvEysI/maxresdefault.jpg",
  },
  {
    badge: "Modo 3 · Touchpad",
    title: "Controle absoluto do sofá",
    description:
      "Role TikTok, leia no Kindle ou navegue na Smart TV. Touchpad multitoque de precisão na palma da mão, em qualquer dispositivo.",
    image: "https://img.youtube.com/vi/wEraBtFURds/maxresdefault.jpg",
  },
];

const StickyModesSection = () => {
  return (
    <section id="modos" className="relative py-14 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
            <p className="text-indigo-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Modos de operação
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-50 leading-[1.1] text-balance">
              Três dispositivos.{" "}
              <span className="text-gradient-blue">Um só hardware.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-light mt-4 text-balance">
              Toque em cada modo para ver como o CheerDots 2 se transforma.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          <StickyImageReveal features={modes} />
        </div>
      </div>
    </section>
  );
};

export default StickyModesSection;
