import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckoutRedirect() {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const scrollToOffer = useCallback(() => {
    document.getElementById("oferta")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const handleCheckoutRedirect = useCallback(() => {
    setIsRedirecting(true);
    const params = new URLSearchParams(window.location.search);
    params.set("stripe", "direct");
    navigate(`/checkout?${params.toString()}`);
  }, [navigate]);

  return { isRedirecting, handleCheckoutRedirect, scrollToOffer };
}
