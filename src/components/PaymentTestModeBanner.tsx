const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;
  return (
    <div className="w-full bg-orange-500/15 border-b border-orange-500/30 px-4 py-2 text-center text-xs text-orange-300 font-medium">
      🧪 Modo de teste — pagamentos no preview não cobram cartão real.{" "}
      <a
        href="https://docs.lovable.dev/features/payments#test-and-live-environments"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Saiba mais
      </a>
    </div>
  );
}
