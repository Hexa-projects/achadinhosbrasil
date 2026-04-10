import { Lock, MessageCircle } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border">
    {/* Achadinhos Brasil trust block */}
    <div className="bg-secondary py-10 border-b border-border">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 text-primary font-bold text-lg mb-4">
          <MessageCircle className="w-5 h-5" />
          Achadinhos Brasil
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          O CheerDots 2 é trazido ao país exclusivamente pela Achadinhos Brasil. Já transformamos a rotina de milhares de brasileiros com produtos inovadores testados e aprovados. Sua compra é processada em território nacional e você conta com suporte 100% humanizado via WhatsApp.
        </p>
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
  </footer>
);

export default FooterSection;
