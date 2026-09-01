import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderOpen, Plus } from "lucide-react";
import { SoftplusLogo } from "@/components/proposal/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrada | Gerador de Propostas Softplus" },
      {
        name: "description",
        content:
          "Tela inicial do gerador de propostas comerciais Softplus. Crie uma nova proposta ou consulte as propostas salvas.",
      },
      { property: "og:title", content: "Entrada | Gerador de Propostas Softplus" },
      {
        property: "og:description",
        content:
          "Crie propostas comerciais personalizadas ou consulte as propostas já salvas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      {/* Fundo institucional suave */}
      <div className="absolute inset-0 -z-10 bg-gradient-surface" />
      <div className="absolute inset-0 -z-10 halo-graphic opacity-60" />
      <div className="absolute inset-0 -z-10 grid-graphic opacity-40" />

      <section className="border-line bg-card shadow-hero w-full max-w-md rounded-[28px] border p-8 text-center">
        <div className="bg-navy-deep/[0.04] -mx-8 -mt-8 flex justify-center rounded-t-[28px] px-8 pb-7 pt-9">
          <SoftplusLogo height={72} />
        </div>

        <h1 className="text-navy-deep font-display mt-7 text-[24px] font-extrabold leading-tight tracking-tight">
          Gerador de Propostas
        </h1>
        <p className="text-navy-soft mt-1 text-[14px] font-semibold">
          Softplus Tecnologia em Sistemas
        </p>
        <p className="text-ink-muted mt-3 text-[13px] leading-relaxed">
          Escolha uma opção para começar. Você pode criar uma proposta do zero ou abrir uma proposta já salva para editar.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/gerar"
            className="bg-gradient-cyan text-navy-deep shadow-soft inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-extrabold transition-transform hover:-translate-y-0.5"
          >
            <Plus className="size-5" /> Gerar Proposta
          </Link>
          <Link
            to="/propostas"
            className="border-line text-navy hover:bg-navy-deep/[0.04] inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-[14px] font-bold transition-colors"
          >
            <FolderOpen className="size-5" /> Propostas Salvas
          </Link>
        </div>

        <div className="bg-surface border-line mt-6 rounded-2xl border px-4 py-3">
          <p className="text-ink-muted text-[12px] leading-snug">
            Ambiente interno Softplus. As propostas ficam salvas automaticamente após clicar em <strong className="text-navy-deep">Salvar</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}
