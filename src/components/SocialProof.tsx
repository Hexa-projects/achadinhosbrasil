import { Briefcase, GraduationCap, Mic2, Plane, Users } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { FadeIn } from "@/components/ui/FadeIn";

const audiences = [
  { icon: Briefcase, label: "Executivos e gestores" },
  { icon: Mic2, label: "Professores e palestrantes" },
  { icon: Users, label: "Vendedores e SDRs" },
  { icon: Plane, label: "Nômades digitais" },
  { icon: GraduationCap, label: "Consultores" },
  { icon: Briefcase, label: "Founders" },
  { icon: Mic2, label: "Criadores de conteúdo" },
];

const SocialProof = () => (
  <section className="relative py-14 md:py-24 overflow-hidden">
    <div className="container mx-auto px-4 mb-10">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-indigo-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
            Para quem importa
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
            Para quem vive{" "}
            <span className="text-gradient-blue">em movimento</span>
          </h2>
        </div>
      </FadeIn>
    </div>

    <div className="relative">
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <Marquee>
        {audiences.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-slate-100"
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium whitespace-nowrap">{a.label}</span>
            </div>
          );
        })}
      </Marquee>
    </div>
  </section>
);

export default SocialProof;
