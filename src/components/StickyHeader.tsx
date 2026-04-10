import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";

const links = [
  { label: "Funções", href: "#funcoes" },
  { label: "Como Funciona", href: "#modos" },
  { label: "Comparativo", href: "#comparativo" },
  { label: "Oferta", href: "#oferta" },
  { label: "FAQ", href: "#faq" },
];

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-black text-sm">C2</span>
          </div>
          <span className="font-bold text-foreground text-lg tracking-tight hidden sm:inline">
            CheerDots 2
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting}
            className="hidden sm:inline-flex bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-70"
          >
            {isRedirecting ? "..." : "Comprar Agora"}
          </button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground py-2 border-b border-border/50 last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={handleCheckoutRedirect}
                disabled={isRedirecting}
                className="mt-2 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold disabled:opacity-70"
              >
                {isRedirecting ? "Redirecionando..." : "Comprar Agora"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default StickyHeader;
