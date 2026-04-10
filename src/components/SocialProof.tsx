import { Star, CheckCircle, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Marcos T.",
    role: "Diretor Comercial",
    text: "Mudou minha rotina. Não anoto mais nada nas reuniões de diretoria, a IA faz tudo e me entrega a ata pronta. A precisão do microfone é absurda. Vale cada centavo investido.",
    stars: 5,
  },
  {
    name: "Camila R.",
    role: "Nômade Digital",
    text: "Cabe no bolso, controla tudo. Uso na mesa do café para trabalhar e de noite divido no meio para usar deitado rolando o TikTok como um controle remoto. Gadget genial.",
    stars: 5,
  },
  {
    name: "Patrick R.",
    role: "Professor Universitário",
    text: "O laser pointer digital e o air mouse transformaram minhas aulas e palestras. Meus alunos e outros professores ficaram impressionados com a fluidez do controle de tela.",
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
  <section className="py-24 relative bg-gray-50 border-t border-border/50">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3">
          +15.000 pessoas já aprovaram no mundo
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          O segredo dos profissionais de{" "}
          <span className="text-primary">alta performance</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {reviews.map((r) => (
          <motion.div key={r.name} variants={cardVariants} className="h-full">
            <div className="p-8 h-full bg-white rounded-3xl border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(r.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 text-base mb-8 leading-relaxed font-medium flex-grow">
                "{r.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary font-bold text-lg border border-blue-100">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-extrabold text-sm flex items-center gap-1.5 text-gray-900">
                    {r.name}
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </p>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">{r.role}</p>
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
