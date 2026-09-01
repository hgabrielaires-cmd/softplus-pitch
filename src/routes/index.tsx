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
    <main className="bg-hero from-hero-start to-hero-end flex min-h-screen items-center justify-center px-5 py-12">
      <div className="border-line bg-card shadow-card w-full max-w-md rounded-[28px] border p-8 text-center">
        <div className="bg-navy-deep/5 -mx-8 -mt-8 flex justify-center rounded-t-[28px] px-8 pb-6 pt-8">
          <SoftplusLogo height={64} />
        </div>

        <h1 className="text-navy-deep font-display mt-6 text-[22px] font-extrabold leading-tight">
          Bem-vindo ao Gerador
          <br />
          de Propostas Softplus
        </h1>
        <p className="text-ink-muted mt-2 text-[13px]">
          Crie propostas comerciais personalizadas ou consulte as propostas já salvas.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/gerar"
            className="bg-gradient-cyan text-navy-deep shadow-soft hover:shadow-cyan-glow inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-extrabold transition-all"
          >
            <Plus className="size-5" /> Gerar Proposta
          </Link>
          <Link
            to="/propostas"
            className="border-line text-navy hover:bg-navy-deep/5 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-[14px] font-bold transition-colors"
          >
            <FolderOpen className="size-5" /> Propostas Salvas
          </Link>
        </div>

        <p className="text-ink-muted/70 mt-6 text-[11px]">
          Ambiente interno Softplus — sem necessidade de login.
        </p>
      </div>
    </main>
  );
}
