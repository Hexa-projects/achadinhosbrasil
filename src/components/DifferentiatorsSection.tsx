import { Mic, MousePointer, Presentation, Hand, BatteryFull, Pocket } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Mic,
    title: "Grava reuniões com um clique",
    desc: "Pressione um botão e o microfone de alta sensibilidade captura tudo. A IA transcreve e gera o resumo automaticamente.",
  },
  {
    icon: MousePointer,
    title: "Mouse, touchpad e air mouse",
    desc: "Três modos de controle em um só dispositivo. Na mesa, no ar ou no sofá — sempre funcional.",
  },
  {
    icon: Presentation,
    title: "Apresentador profissional",
    desc: "Ponteiro laser digital, avanço de slides e controle de tela a até 20 metros. Ideal para salas de reunião e auditórios.",
  },
  {
    icon: Hand,
    title: "Transcrição e resumo com IA",
    desc: "O software integrado com ChatGPT converte áudio em texto e gera atas e resumos prontos para compartilhar.",
  },
  {
    icon: Pocket,
    title: "70g — cabe no bolso",
    desc: "Design magnético ultracompacto. Leve para qualquer reunião, voo ou café sem sentir peso extra.",
  },
  {
    icon: BatteryFull,
    title: "Bateria para semanas",
    desc: "Até 25 dias em standby com recarga USB-C rápida. Não vai te deixar na mão no meio da apresentação.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const DifferentiatorsSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          Por que ele é diferente
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Tudo o que você precisa.{" "}
          <span className="text-gradient-blue">Nada que você não precisa.</span>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={cardVariants}
            className="group p-8 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default DifferentiatorsSection;
