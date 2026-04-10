import { Star, CheckCircle, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Marcos T.",
    role: "Diretor Comercial — Indústria",
    text: "Mudou minha rotina de reuniões. Antes eu gastava 30 minutos depois de cada call digitando atas. Agora o CheerDots grava tudo e me entrega o resumo pronto. A precisão do microfone é surpreendente para o tamanho do dispositivo.",
    stars: 5,
  },
  {
    name: "Camila R.",
    role: "Consultora de Marketing — Nômade Digital",
    text: "Cabe literalmente no bolso da calça. Uso como mouse na mesa do café para trabalhar e à noite divido no meio para apresentar decks para clientes via Zoom. Virou indispensável no meu kit de trabalho.",
    stars: 5,
  },
  {
    name: "Patrick R.",
    role: "Professor Universitário — Engenharia",
    text: "O laser pointer digital e o air mouse transformaram minhas aulas. Consigo caminhar pela sala inteira enquanto controlo os slides com total precisão. Outros professores já me pediram o link.",
    stars: 5,
  },
  {
    name: "Fernanda L.",
    role: "SDR — SaaS B2B",
    text: "Gravo todas as calls de qualificação e recebo a transcrição para preencher o CRM depois. Minha produtividade subiu demais e meu gestor notou a diferença na qualidade dos registros.",
    stars: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const SocialProof = () => (
  <section className="py-24 relative bg-white">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          +15.000 profissionais já aprovaram
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Quem usa, <span className="text-gradient-blue">recomenda</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {reviews.map((r) => (
          <motion.div key={r.name} variants={cardVariants}>
            <div className="p-7 h-full bg-secondary/40 rounded-2xl border border-border/50 relative flex flex-col hover:shadow-sm transition-all">
              <Quote className="absolute top-6 right-6 w-7 h-7 text-primary/8" />

              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(r.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-foreground/80 text-sm mb-6 leading-relaxed flex-grow">
                "{r.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm flex items-center gap-1.5 text-foreground">
                    {r.name}
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{r.role}</p>
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
