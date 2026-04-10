import { useState, useEffect } from "react";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  { icon: Truck, text: "Entrega com Rastreio Completo" },
  { icon: ShieldCheck, text: "Garantia de 12 Meses" },
  { icon: CreditCard, text: "Parcelamento em até 12x" },
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = messages[index];

  return (
    <div className="bg-foreground text-background py-2 px-4 relative z-[60] h-8 overflow-hidden">
      {/* Desktop: show all */}
      <div className="hidden sm:flex container mx-auto items-center justify-center gap-6 text-xs font-medium">
        {messages.map((m, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <m.icon className="w-3 h-3" /> {m.text}
            {i < messages.length - 1 && (
              <span className="ml-6 opacity-30">|</span>
            )}
          </span>
        ))}
      </div>

      {/* Mobile: rotate */}
      <div className="sm:hidden flex items-center justify-center h-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="flex items-center gap-1.5 text-[11px] font-medium"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <current.icon className="w-3 h-3 flex-shrink-0" />
            {current.text}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnnouncementBar;
