import { Mic, Sparkles, Clock } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { FadeIn } from "@/components/ui/FadeIn";

const pains = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Gravação instantânea",
    description: "Um toque inicia. Capture toda a reunião sem distrair sua atenção do que importa.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Resumo com ChatGPT",
    description: "IA transcreve, organiza tópicos e gera resumos acionáveis em segundos.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Horas de volta",
    description: "Pare de digitar atas. Ganhe 5h por semana e foque em decisões de verdade.",
  },
];

const ProblemSection = () => (
  <section className="relative py-14 md:py-28">
    <div className="container mx-auto px-4">
      <FadeIn>
        <div className="text-center mb-12 md:mb-14 max-w-3xl mx-auto">
          <p className="font-inter text-indigo-400 font-semibold text-xs tracking-[0.18em] uppercase mb-4">
            O problema
          </p>
          <h2 className="font-sora font-semibold tracking-[-0.02em] leading-[1.05] text-[1.9rem] sm:text-3xl md:text-5xl text-slate-50">
            Você ainda perde tempo{" "}
            <span className="text-gradient-blue">anotando reuniões manualmente?</span>
          </h2>
          <p className="font-inter font-normal text-slate-300 text-base md:text-[17px] mt-5 leading-relaxed max-w-xl mx-auto">
            Profissionais gastam horas por semana digitando atas, perdendo detalhes e retrabalho. O CheerDots 2 resolve isso em um clique.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
        {pains.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <BentoCard {...p} className="h-full" />
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
