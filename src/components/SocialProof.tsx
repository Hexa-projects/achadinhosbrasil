import { Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const SocialProof = () => (
  <section className="py-24 relative section-alt">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
          +15.000 pessoas já aprovaram
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          O segredo dos profissionais de{" "}
          <span className="text-gradient-blue">alta performance</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {reviews.map((r) => (
          <motion.div key={r.name} variants={cardVariants}>
            <div className="p-6 h-full bg-card rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(r.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground mb-5 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm flex items-center gap-1 text-foreground">
                    {r.name}
                    <CheckCircle className="w-3.5 h-3.5 text-green-accent" />
                  </p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SocialProof;
