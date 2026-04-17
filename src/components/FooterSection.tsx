import { Lock, ShieldCheck, Headphones } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const FooterSection = () => (
  <footer className="relative border-t border-white/5">
    <div className="py-14 md:py-16">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <FadeIn>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
            <ShieldCheck className="w-4 h-4" />
            Achadinhos Brasil — Tecnologia com Confiança
          </div>
          <p className="text-slate-400 leading-relaxed text-sm font-light mb-5">
            O CheerDots 2 é trazido ao Brasil exclusivamente pela Achadinhos Brasil. Curadoria, testes e suporte local — sua compra é processada em território nacional com atendimento humanizado via WhatsApp.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Headphones className="w-4 h-4 text-primary/70" />
            <span className="font-light">Suporte dedicado em português</span>
          </div>
        </FadeIn>
      </div>
    </div>

    <div className="border-t border-white/5 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4 font-light">
          <Lock className="w-3.5 h-3.5" />
          Checkout Seguro — Visa, Mastercard, Pix, Boleto — Certificado SSL
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 mb-5">
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Contato</a>
        </div>
        <p className="text-xs text-slate-600 font-light">
          © {new Date().getFullYear()} Achadinhos Brasil. Todos os direitos reservados.
        </p>
      </div>
    </div>
    {/* Spacer for mobile sticky CTA */}
    <div className="h-20 md:hidden" />
  </footer>
);

export default FooterSection;
