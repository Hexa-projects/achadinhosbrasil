import { Briefcase, GraduationCap, Mic2, Plane, MonitorPlay, Users } from "lucide-react";
import { motion } from "framer-motion";

const personas = [
  {
    icon: Briefcase,
    title: "Executivos e gestores",
    desc: "Grave reuniões, receba atas prontas e nunca perca um insight estratégico.",
  },
  {
    icon: Users,
    title: "Consultores em trânsito",
    desc: "Um dispositivo leve para apresentar propostas, controlar slides e gravar feedbacks do cliente.",
  },
  {
    icon: GraduationCap,
    title: "Professores e palestrantes",
    desc: "Laser digital, air mouse e avanço de slides para aulas e eventos com total controle.",
  },
  {
    icon: Mic2,
    title: "Vendedores e SDRs",
    desc: "Transcreva calls de vendas, gere resumos e foque na negociação ao invés de anotar.",
  },
  {
    icon: Plane,
    title: "Nômades digitais",
    desc: "70g no bolso — mouse, touchpad e gravador. Trabalhe de qualquer lugar sem carregar acessórios extras.",
  },
  {
    icon: MonitorPlay,
    title: "Home office e híbrido",
    desc: "No sofá para rolar conteúdo ou na mesa para trabalhar. Um gadget, dois mundos.",
  },
];

const UseCasesSection = () => (
  <section className="py-24 section-alt">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          Feito para quem faz acontecer
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Para quem vive em <span className="text-gradient-blue">movimento</span>
        </h2>
        <p className="text-muted-foreground text-base mt-4 leading-relaxed">
          O CheerDots 2 se adapta ao seu estilo de trabalho — não o contrário.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {personas.map((p, i) => (
          <motion.div
            key={p.title}
            className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-border/50 hover:shadow-sm transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <p.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
