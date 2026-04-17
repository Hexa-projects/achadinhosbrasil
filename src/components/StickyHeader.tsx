import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

const links = [
  { label: "Funções", href: "#funcoes" },
  { label: "Modos", href: "#modos" },
  { label: "Comparativo", href: "#comparativo" },
  { label: "Oferta", href: "#oferta" },
];

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`pointer-events-auto w-full max-w-3xl rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] bg-zinc-950/80" : ""
        }`}
      >
        <div className="flex items-center justify-between h-12 sm:h-14 pl-3 pr-2 sm:pl-5 sm:pr-2">
          <a href="#" className="flex items-center gap-2 group min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_0_20px_-4px_hsl(239_84%_67%/0.7)] shrink-0">
              <span className="text-white font-black text-xs">C2</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight hidden sm:inline">
              CheerDots 2
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCheckoutRedirect}
              disabled={isRedirecting}
              className="hidden sm:inline-flex items-center h-9 px-4 rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-70"
            >
              {isRedirecting ? "..." : "Comprar"}
            </button>
            <button
              className="md:hidden h-9 w-9 inline-flex items-center justify-center text-white rounded-full hover:bg-white/5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
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
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="p-4 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-slate-200 py-2.5 px-3 rounded-lg hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={handleCheckoutRedirect}
                  disabled={isRedirecting}
                  className="mt-2 bg-white text-zinc-950 py-3 rounded-full text-sm font-bold disabled:opacity-70"
                >
                  {isRedirecting ? "Redirecionando..." : "Comprar com 50% OFF"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default StickyHeader;
