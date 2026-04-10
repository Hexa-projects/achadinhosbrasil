import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Tem garantia?", a: "Sim, 12 meses contra defeitos de fabricação." },
  { q: "Funciona em Mac e Windows?", a: "Sim, compatibilidade universal via Bluetooth. Também funciona com iPad e smartphones." },
  { q: "Precisa pagar mensalidade do ChatGPT?", a: "Não, as funções nativas de IA via software são gratuitas." },
  { q: "Quanto tempo dura a bateria?", a: "Até 20+ dias em standby. Em uso contínuo, dura um dia inteiro de trabalho." },
  { q: "Como funciona o frete?", a: "Frete internacional expresso com rastreio completo. Prazo médio de 15 a 25 dias úteis." },
];

const FaqSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Perguntas <span className="text-gradient-cyan">Frequentes</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass rounded-xl px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
