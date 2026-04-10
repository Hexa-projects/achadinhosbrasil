import heroProduct from "@/assets/hero-product.jpg";
import { Star } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 animate-fade-up">
          Cheerdots 2 — 6 em 1
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          O Mouse Evoluiu.{" "}
          <span className="text-gradient-cyan">
            O 1º Assistente de IA de Bolso.
          </span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Grava reuniões, transcreve áudios com ChatGPT, controla apresentações e telas à distância. O futuro da produtividade está nas suas mãos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#oferta"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold animate-pulse-glow hover:brightness-110 transition-all"
          >
            Garantir Lote Promocional
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <span className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
            <span className="ml-1 font-semibold text-foreground">4.9/5</span>
          </span>
          <span>(1.240 Avaliações)</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Compra Segura</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.5s" }}>
        <img
          src={heroProduct}
          alt="CheerDots 2 - Mouse com Inteligência Artificial"
          className="w-full rounded-2xl animate-float"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
