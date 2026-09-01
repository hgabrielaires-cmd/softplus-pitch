import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { deleteProposta, listPropostas, type PropostaRow } from "@/lib/propostas";

export const Route = createFileRoute("/propostas")({
  head: () => ({
    meta: [
      { title: "Propostas salvas | Softplus" },
      {
        name: "description",
        content:
          "Consulte, edite ou exclua as propostas comerciais Softplus salvas pela equipe comercial.",
      },
      { property: "og:title", content: "Propostas salvas | Softplus" },
      {
        property: "og:description",
        content: "Lista de propostas comerciais Softplus salvas, prontas para editar ou gerar PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropostasPage,
});

function PropostasPage() {
  const [rows, setRows] = useState<PropostaRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => {
    listPropostas()
      .then(setRows)
      .catch((e: Error) => setError(e.message));
  };

  useEffect(load, []);

  const remove = async (id: string) => {
    if (!window.confirm("Excluir esta proposta?")) return;
    await deleteProposta(id);
    load();
  };

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-navy-deep font-display text-[22px] font-extrabold">
            Propostas salvas
          </h1>
          <p className="text-ink-muted text-[12px]">Abra para consultar ou alterar.</p>
        </div>
        <Link
          to="/gerar"
          className="bg-gradient-cyan text-navy-deep inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold"
        >
          <Plus className="size-4" /> Nova proposta
        </Link>
      </div>

      {error && <p className="text-[12px] text-red-600">Erro ao carregar: {error}</p>}
      {!rows && !error && <p className="text-ink-muted text-[12px]">Carregando…</p>}
      {rows?.length === 0 && (
        <p className="text-ink-muted text-[12px]">Nenhuma proposta salva ainda.</p>
      )}

      <ul className="space-y-2">
        {rows?.map((r) => (
          <li
            key={r.id}
            className="border-line bg-card shadow-card flex items-center gap-3 rounded-2xl border p-3.5"
          >
            <FileText className="text-cyan size-5 shrink-0" />
            <button
              onClick={() => navigate({ to: "/gerar", search: { id: r.id } })}
              className="min-w-0 flex-1 text-left"
            >
              <p className="text-navy-deep truncate text-[13px] font-bold">
                {r.cliente || "Sem cliente"} {r.plano ? `· ${r.plano}` : ""}
              </p>
              <p className="text-ink-muted truncate text-[11px]">
                Nº {r.numero || "—"} · atualizada em{" "}
                {new Date(r.updated_at).toLocaleString("pt-BR")}
              </p>
            </button>
            <button
              onClick={() => remove(r.id)}
              aria-label="Excluir proposta"
              className="border-line text-ink-muted hover:text-navy shrink-0 rounded-lg border p-2"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
