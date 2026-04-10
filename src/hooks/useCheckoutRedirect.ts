import { useState, useCallback } from "react";

const CHECKOUT_BASE_URL =
  "https://achadinhos-brasil10.pay.yampi.com.br/r/EL6XX4JHI1";

export function useCheckoutRedirect() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckoutRedirect = useCallback(() => {
    setIsRedirecting(true);
    const currentParams = window.location.search;
    const targetUrl = currentParams
      ? `${CHECKOUT_BASE_URL}${currentParams}`
      : CHECKOUT_BASE_URL;
    window.location.href = targetUrl;
  }, []);

  return { isRedirecting, handleCheckoutRedirect };
}
