import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileCTA = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-3 inset-x-3 z-50 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting}
            className="relative w-full h-14 rounded-full overflow-hidden p-[1.5px] shadow-[0_10px_40px_-10px_hsl(239_84%_67%/0.7)] disabled:opacity-70 active:scale-[0.98] transition-transform animate-pulse-glow"
            aria-label="Comprar CheerDots 2 com 50% de desconto"
          >
            {/* Spinning conic border */}
            <span
              aria-hidden
              className="absolute inset-[-100%] animate-[spin-slow_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A5B4FC_0%,#6366F1_25%,#A78BFA_50%,#6366F1_75%,#A5B4FC_100%)] pointer-events-none"
            />
            {/* Solid inner pill — text MUST be on top */}
            <span className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-full bg-zinc-950 text-white text-[15px] font-bold tracking-tight">
              {isRedirecting ? (
                "Redirecionando..."
              ) : (
                <>
                  Comprar com 50% OFF
                  <span aria-hidden className="text-indigo-300">→</span>
                </>
              )}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCTA;
