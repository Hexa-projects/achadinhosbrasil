import { Lock, ShieldCheck, Headphones } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border">
    <div className="bg-secondary py-12">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 text-primary font-bold text-base mb-4">
          <ShieldCheck className="w-5 h-5" />
          Achadinhos Brasil — Tecnologia com Confiança
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm mb-4">
          O CheerDots 2 é trazido ao Brasil exclusivamente pela Achadinhos Brasil. Somos especializados em produtos de tecnologia e produtividade com curadoria, testes e suporte local. Sua compra é processada em território nacional com atendimento humanizado via WhatsApp.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Headphones className="w-4 h-4 text-primary/60" />
          <span className="font-medium">Suporte dedicado em português</span>
        </div>
      </div>
    </div>

    <div className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm mb-4 opacity-80">
          <Lock className="w-4 h-4" />
          Checkout Seguro — Visa, Mastercard, Pix, Boleto — Certificado SSL
        </div>
        <div className="flex items-center justify-center gap-6 text-xs opacity-60 mb-6">
          <a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Privacidade</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Contato</a>
        </div>
        <p className="text-xs opacity-50">
          © {new Date().getFullYear()} Achadinhos Brasil. Todos os direitos reservados.
        </p>
      </div>
    </div>
    {/* Spacer for mobile sticky CTA */}
    <div className="h-16 md:hidden" />
  </footer>
);

export default FooterSection;
