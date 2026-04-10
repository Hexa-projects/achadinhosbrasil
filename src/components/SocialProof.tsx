import { Star, CheckCircle } from "lucide-react";

const reviews = [
  {
    name: "Marcos T.",
    role: "Diretor Comercial",
    text: "Mudou minha rotina. Não anoto mais nada nas reuniões de diretoria, a IA faz tudo. Vale cada centavo.",
    stars: 5,
  },
  {
    name: "Camila R.",
    role: "Nômade Digital",
    text: "Cabe no bolso, controla tudo. Uso nas apresentações e depois no sofá pro TikTok. Genial.",
    stars: 5,
  },
  {
    name: "Patrick R.",
    role: "Professor Universitário",
    text: "O laser pointer digital e o air mouse transformaram minhas aulas. Meus alunos ficaram impressionados.",
    stars: 5,
  },
];

const SocialProof = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          +15.000 pessoas já aprovaram
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          O segredo dos profissionais de{" "}
          <span className="text-gradient-cyan">alta performance</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(r.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-5 leading-relaxed">"{r.text}"</p>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {r.name[0]}
              </div>
              <div>
                <p className="font-semibold text-sm flex items-center gap-1">
                  {r.name}
                  <CheckCircle className="w-3.5 h-3.5 text-green-accent" />
                </p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
