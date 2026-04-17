import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckoutRedirect() {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckoutRedirect = useCallback(() => {
    setIsRedirecting(true);
    const search = window.location.search;
    navigate(`/checkout${search}`);
  }, [navigate]);

  return { isRedirecting, handleCheckoutRedirect };
}
