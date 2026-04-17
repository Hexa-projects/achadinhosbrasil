import { FadeIn } from "@/components/ui/FadeIn";
import { MobileAccordion } from "@/components/ui/MobileAccordion";

const faqs = [
  { q: "Funciona em Mac e Windows?", a: "Sim. Compatível com macOS 10.15+ e Windows 10/11 via Bluetooth. Também funciona como mouse/controle em iPads e smartphones." },
  { q: "Preciso pagar assinatura do ChatGPT?", a: "Não. O software CheerPod já inclui acesso ao motor de IA para transcrições e resumos. Não é necessário ter conta na OpenAI." },
  { q: "Como funciona a gravação e transcrição?", a: "Você inicia a gravação com um botão no dispositivo. O microfone capta o áudio do ambiente. Depois, no software CheerPod (desktop), a IA transcreve o áudio e gera resumos automaticamente." },
  { q: "O software é necessário para quais funções?", a: "As funções de mouse, touchpad, air mouse, apresentador e laser funcionam de forma independente via Bluetooth. As funções de gravação, transcrição e resumo com IA requerem o software CheerPod instalado no computador." },
  { q: "Quanto dura a bateria?", a: "Até 20–25 dias em standby. Em uso contínuo, dura um dia inteiro de trabalho. Recarrega via USB-C." },
  { q: "Funciona como mouse normal?", a: "Sim. Quando as duas metades estão unidas, ele funciona como um touchpad Bluetooth silencioso e preciso para uso diário em qualquer superfície." },
  { q: "Serve para apresentações?", a: "Sim. Modo apresentador com avanço de slides, laser pointer digital, spotlight e air mouse — ideal para reuniões, aulas e palestras." },
  { q: "Tem garantia?", a: "Sim, 12 meses contra defeitos de fabricação. Suporte direto pela Achadinhos Brasil via WhatsApp." },
  { q: "Como funciona o frete? Em quanto tempo chega?", a: "Frete com rastreio completo. Prazo médio de 15 a 25 dias úteis após a confirmação do pagamento." },
  { q: "É fácil de configurar?", a: "Sim. Basta ligar o Bluetooth e parear. Para as funções de IA, instale o software CheerPod (download gratuito) e pronto." },
];

const FaqSection = () => (
  <section id="faq" className="relative py-14 md:py-28">
    <div className="container mx-auto px-4">
      <FadeIn>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-inter text-primary font-semibold text-xs tracking-[0.18em] uppercase mb-4">
            Tire suas dúvidas
          </p>
          <h2 className="font-sora font-semibold tracking-[-0.02em] leading-[1.05] text-[1.9rem] sm:text-3xl md:text-5xl text-white">
            Perguntas <span className="text-gradient-blue">frequentes</span>
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <MobileAccordion key={i} question={faq.q} answer={faq.a} defaultOpen={i === 0} />
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default FaqSection;
