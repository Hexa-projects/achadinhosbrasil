import { Sparkles, Mouse, Hand, Presentation, ScrollText } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { FadeIn } from "@/components/ui/FadeIn";

const FeatureGrid = () => (
  <section id="funcoes" className="relative py-16 md:py-28">
    <div className="container mx-auto px-4">
      <FadeIn>
        <div className="text-center mb-12 md:mb-14 max-w-3xl mx-auto">
          <p className="text-indigo-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
            Funcionalidades
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
            Tudo o que você precisa.
            <br />
            <span className="text-gradient-blue">Nada que não precisa.</span>
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
        {/* Hero card — IA */}
        <FadeIn className="md:col-span-2 md:row-span-2">
          <BentoCard
            icon={<Sparkles className="w-6 h-6" />}
            className="h-full min-h-[420px] !p-0 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
              alt="Reunião sendo transcrita por IA"
              className="w-full h-40 md:h-48 object-cover opacity-80"
              loading="lazy"
            />
            <div className="p-7 md:p-8 flex flex-col flex-1">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-indigo-400 shadow-[0_0_20px_-3px_hsl(239_84%_67%/0.5)] self-start">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-slate-50">
                Transcrição e resumo com IA
              </h3>
              <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base">
                Grave qualquer reunião com um toque. O CheerDots envia o áudio para o ChatGPT e devolve transcrição, tópicos e ações pendentes. Pare de digitar atas — comece a decidir.
              </p>
            </div>
          </BentoCard>
        </FadeIn>

        <FadeIn delay={0.1}>
          <BentoCard
            icon={<Mouse className="w-6 h-6" />}
            title="Mouse Bluetooth"
            description="Touchpad multitoque preciso para Mac e Windows. Conecta em 3 segundos."
            className="h-full"
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          <BentoCard
            icon={<Hand className="w-6 h-6" />}
            title="Air Mouse"
            description="Levante o dispositivo e controle o cursor pelo ar com sensores 6-axis."
            className="h-full"
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <BentoCard
            icon={<Presentation className="w-6 h-6" />}
            className="h-full !p-0 overflow-hidden md:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              <img
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=600&auto=format&fit=crop"
                alt="Apresentação profissional com slides"
                className="w-full h-44 sm:h-full object-cover opacity-75"
                loading="lazy"
              />
              <div className="p-7 md:p-8 flex flex-col justify-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-indigo-400 shadow-[0_0_20px_-3px_hsl(239_84%_67%/0.5)] self-start">
                  <Presentation className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-slate-50">
                  Apresentador de slides
                </h3>
                <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base">
                  Avance, recue e use spotlight, ponteiro laser ou caneta digital sem encostar no teclado.
                </p>
              </div>
            </div>
          </BentoCard>
        </FadeIn>

        <FadeIn delay={0.25}>
          <BentoCard
            icon={<ScrollText className="w-6 h-6" />}
            title="Scroller remoto"
            description="Role teleprompter, slides e documentos sem encostar no notebook."
            className="h-full"
          />
        </FadeIn>
      </div>
    </div>
  </section>
);

export default FeatureGrid;
