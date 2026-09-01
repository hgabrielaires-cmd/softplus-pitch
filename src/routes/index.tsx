import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderOpen, Plus } from "lucide-react";
import { SoftplusLogo } from "@/components/proposal/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Propostas Comerciais | Softplus" },
      {
        name: "description",
        content:
          "Menu do gerador de propostas comerciais Softplus: crie uma nova proposta ou consulte as propostas salvas.",
      },
      { property: "og:title", content: "Propostas Comerciais | Softplus" },
      {
        property: "og:description",
        content: "Crie uma nova proposta comercial Softplus ou consulte as propostas já salvas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="border-line bg-card shadow-card w-full max-w-md rounded-3xl border p-8 text-center">
        <div className="flex justify-center">
          <SoftplusLogo height={54} />
        </div>
        <h1 className="text-navy-deep font-display mt-6 text-[20px] font-extrabold">
          Propostas Comerciais
        </h1>
        <p className="text-ink-muted mt-1 text-[12px]">
          Escolha uma opção para começar.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/gerar"
            className="bg-gradient-cyan text-navy-deep inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-bold"
          >
            <Plus className="size-4" /> Gerar Proposta
          </Link>
          <Link
            to="/propostas"
            className="border-line text-navy inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-[13px] font-bold"
          >
            <FolderOpen className="size-4" /> Propostas Salvas
          </Link>
        </div>
      </div>
    </main>
  );
}
