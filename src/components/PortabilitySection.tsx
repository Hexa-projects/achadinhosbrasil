import { motion } from "framer-motion";
import { Battery, Pocket, Bluetooth } from "lucide-react";

const CDN = "https://cdn.shopify.com/s/files/1/0577/3076/0913/files";

const highlights = [
  {
    icon: Pocket,
    title: "70g — cabe no bolso",
    desc: "Design magnético ultracompacto. Leve para qualquer reunião, voo ou café.",
  },
  {
    icon: Battery,
    title: "20+ dias com uma carga",
    desc: "Bateria de longa duração com recarga USB-C. Não vai te deixar na mão.",
  },
  {
    icon: Bluetooth,
    title: "Bluetooth 5.0+",
    desc: "Conexão instantânea com Mac, Windows, iPad e smartphones.",
  },
];

const PortabilitySection = () => (
  <section className="py-16 md:py-24 section-alt">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            Portabilidade real
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
            Leve no bolso.{" "}
            <span className="text-gradient-blue">Use em qualquer lugar.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            O CheerDots 2 tem um design leve e compacto que vai a qualquer lugar e é fácil de guardar no bolso. Quando é hora de brilhar, sua estética impressionante chama atenção e deixa uma impressão duradoura.
          </p>

          <div className="space-y-5">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{h.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-white">
            <img
              src={`${CDN}/7961bead4df5a8f7ccfd6baff9b036e0_d57008e9-c87d-4aab-8f80-9c865cdc127a_500x.gif?v=1716600322`}
              alt="CheerDots 2 — Design magnético portátil"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-white">
            <img
              src={`${CDN}/20_Days_Standby_c2180500-9e25-423c-ada6-2b2caf8c721f_500x.jpg?v=1716600322`}
              alt="CheerDots 2 — 20+ dias de bateria"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PortabilitySection;
