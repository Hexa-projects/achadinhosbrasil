import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface MobileAccordionProps {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
}

export const MobileAccordion = ({ question, answer, defaultOpen = false }: MobileAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-5 py-4 transition-colors hover:border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 text-left text-slate-50 font-medium text-[15px] md:text-base"
        aria-expanded={isOpen}
      >
        <span className="flex-1">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-indigo-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm text-slate-300 font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
