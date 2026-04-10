import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import { useState, useEffect } from "react";

const MobileCTA = () => {
  const { isRedirecting, handleCheckoutRedirect } = useCheckoutRedirect();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-border/50 p-3 safe-area-bottom">
      <button
        onClick={handleCheckoutRedirect}
        disabled={isRedirecting}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold shadow-md disabled:opacity-70"
      >
        {isRedirecting ? "Redirecionando..." : "Comprar com 50% OFF →"}
      </button>
    </div>
  );
};

export default MobileCTA;
