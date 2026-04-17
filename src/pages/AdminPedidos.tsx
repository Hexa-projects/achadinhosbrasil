import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, RefreshCcw, Download, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Order = {
  id: string;
  created_at: string;
  paid_at: string | null;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount_cents: number;
  currency: string;
  price_id: string;
  shipping_city: string;
  shipping_state: string;
  utm_source: string | null;
  utm_campaign: string | null;
  environment: string;
};

const STORAGE_KEY = "admin_pwd";

const STATUS_BADGES: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  failed: "bg-red-500/15 text-red-300 border-red-500/30",
  expired: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  canceled: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function AdminPedidos() {
  const [pwd, setPwd] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<string>("all");
  const [since, setSince] = useState("");
  const [until, setUntil] = useState("");
  const [search, setSearch] = useState("");

  async function load(passwordOverride?: string) {
    const password = passwordOverride ?? pwd;
    if (!password) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (status !== "all") params.set("status", status);
      if (since) params.set("since", new Date(since).toISOString());
      if (until) params.set("until", new Date(until + "T23:59:59").toISOString());
      params.set("limit", "500");

      const { data, error: fnErr } = await supabase.functions.invoke(
        `list-orders?${params.toString()}`,
        {
          method: "GET",
          headers: { "x-admin-password": password },
        },
      );
      if (fnErr) {
        const msg = (fnErr as any)?.context?.body
          ? "Senha inválida ou erro de rede"
          : (fnErr as any)?.message || "Erro";
        throw new Error(msg);
      }
      setOrders((data?.orders as Order[]) ?? []);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (pwd) load(pwd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return orders;
    const s = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.customer_email.toLowerCase().includes(s) ||
        o.customer_name.toLowerCase().includes(s) ||
        o.customer_phone.includes(s) ||
        o.id.toLowerCase().includes(s),
    );
  }, [orders, search]);

  const totals = useMemo(() => {
    const paid = filtered.filter((o) => o.status === "paid");
    const grossCents = paid.reduce((acc, o) => acc + o.amount_cents, 0);
    return {
      count: filtered.length,
      paid: paid.length,
      gross: grossCents / 100,
    };
  }, [filtered]);

  function exportCsv() {
    const headers = [
      "id",
      "created_at",
      "paid_at",
      "status",
      "customer_name",
      "customer_email",
      "customer_phone",
      "amount_brl",
      "city",
      "state",
      "utm_source",
      "utm_campaign",
      "environment",
    ];
    const rows = filtered.map((o) => [
      o.id,
      o.created_at,
      o.paid_at ?? "",
      o.status,
      escape(o.customer_name),
      o.customer_email,
      o.customer_phone,
      (o.amount_cents / 100).toFixed(2).replace(".", ","),
      escape(o.shipping_city),
      o.shipping_state,
      o.utm_source ?? "",
      o.utm_campaign ?? "",
      o.environment,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedidos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
        >
          <div className="w-12 h-12 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-indigo-300" />
          </div>
          <h1 className="text-xl font-bold text-white text-center tracking-tight">
            Painel Admin
          </h1>
          <p className="text-xs text-slate-400 text-center mt-1 mb-5">
            Acesso restrito ao gestor da loja.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(pwd);
            }}
          >
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Senha de admin"
              className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-base focus:outline-none focus:border-indigo-500"
            />
            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
            <button
              type="submit"
              disabled={loading || !pwd}
              className="w-full h-11 mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold disabled:opacity-50"
            >
              {loading ? "Verificando…" : "Entrar"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-base font-semibold text-white tracking-tight">
            Painel · Pedidos
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load()}
              className="h-9 px-3 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10 inline-flex items-center gap-1.5"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Atualizar
            </button>
            <button
              onClick={exportCsv}
              className="h-9 px-3 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-white/90 inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Pedidos" value={String(totals.count)} />
          <Stat label="Pagos" value={String(totals.paid)} accent="text-emerald-400" />
          <Stat
            label="Receita (pagos)"
            value={`R$ ${totals.gross.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 grid sm:grid-cols-[1fr_160px_160px_160px_auto] gap-3 items-end">
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">Buscar</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="email, nome, telefone, id"
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Todos</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="failed">Falhou</option>
              <option value="canceled">Cancelado</option>
              <option value="expired">Expirado</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">De</label>
            <input
              type="date"
              value={since}
              onChange={(e) => setSince(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">Até</label>
            <input
              type="date"
              value={until}
              onChange={(e) => setUntil(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={() => load()}
            className="h-10 px-4 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 inline-flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" /> Aplicar
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Contato</th>
                  <th className="px-4 py-3">Cidade</th>
                  <th className="px-4 py-3">Origem</th>
                  <th className="px-4 py-3 text-right">Valor</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="p-8 text-center text-slate-400">Carregando…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-slate-400">Nenhum pedido encontrado.</td></tr>
                ) : (
                  filtered.map((o) => (
                    <tr key={o.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-slate-300 text-xs whitespace-nowrap">
                        {new Date(o.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                      <td className="px-4 py-3 text-white">{o.customer_name}</td>
                      <td className="px-4 py-3 text-slate-300 text-xs">
                        <div>{o.customer_email}</div>
                        <div className="text-slate-500">{o.customer_phone}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-xs">
                        {o.shipping_city}/{o.shipping_state}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {o.utm_source || "—"}
                        {o.utm_campaign && <div className="text-slate-500">{o.utm_campaign}</div>}
                      </td>
                      <td className="px-4 py-3 text-right text-white font-semibold whitespace-nowrap">
                        R$ {(o.amount_cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full border text-[11px] font-medium ${STATUS_BADGES[o.status] || STATUS_BADGES.pending}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
      <p className="text-[11px] uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${accent || "text-white"}`}>{value}</p>
    </div>
  );
}

function escape(v: string) {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}
