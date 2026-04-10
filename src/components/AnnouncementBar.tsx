import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const AnnouncementBar = () => (
  <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4">
    <div className="container mx-auto flex items-center justify-center gap-6 text-xs md:text-sm text-primary font-medium flex-wrap">
      <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Frete Internacional com Rastreio</span>
      <span className="hidden sm:inline text-primary/30">|</span>
      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 1 Ano de Garantia</span>
      <span className="hidden sm:inline text-primary/30">|</span>
      <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Pagamento 100% Seguro</span>
    </div>
  </div>
);

export default AnnouncementBar;
