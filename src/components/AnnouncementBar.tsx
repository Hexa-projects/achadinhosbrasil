import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const AnnouncementBar = () => (
  <div className="bg-foreground text-background py-2 px-4 relative z-[60]">
    <div className="container mx-auto flex items-center justify-center gap-6 text-[11px] md:text-xs font-medium flex-wrap">
      <span className="flex items-center gap-1.5">
        <Truck className="w-3 h-3" /> Entrega com Rastreio Completo
      </span>
      <span className="hidden sm:inline opacity-30">|</span>
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="w-3 h-3" /> Garantia de 12 Meses
      </span>
      <span className="hidden sm:inline opacity-30">|</span>
      <span className="flex items-center gap-1.5">
        <CreditCard className="w-3 h-3" /> Parcelamento em até 12x
      </span>
    </div>
  </div>
);

export default AnnouncementBar;
