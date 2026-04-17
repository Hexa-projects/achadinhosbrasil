import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileCTA = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-3 inset-x-3 z-50 md:hidden"
        >
          <button
            onClick={handleCheckoutRedirect}
            disabled={isRedirecting}
            className="relative w-full inline-flex h-14 overflow-hidden rounded-full p-[1.5px] shadow-[0_10px_40px_-10px_hsl(239_84%_67%/0.7)] disabled:opacity-70"
          >
            <span className="absolute inset-[-1000%] animate-[spin-slow_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A5B4FC_0%,#6366F1_25%,#A78BFA_50%,#6366F1_75%,#A5B4FC_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-zinc-950 text-white text-sm font-bold">
              {isRedirecting ? "Redirecionando..." : "Comprar com 50% OFF →"}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCTA;
