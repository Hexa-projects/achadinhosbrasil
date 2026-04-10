import { Lock } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
        <Lock className="w-4 h-4" />
        Checkout Seguro — Visa, Mastercard, Pix, Boleto — Certificado SSL
      </div>
      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mb-6">
        <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
        <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
        <a href="#" className="hover:text-foreground transition-colors">Contato</a>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} CheerDots Brasil. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default FooterSection;
