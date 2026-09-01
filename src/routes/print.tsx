import { createFileRoute, useSearch } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ProposalDocument } from "@/components/proposal/ProposalDocument";
import type { ProposalData } from "@/types/proposal";

const printSearchSchema = z.object({
  data: z.string().optional(),
});

export const Route = createFileRoute("/print")({
  validateSearch: zodValidator(printSearchSchema),
  head: () => ({
    meta: [
      { title: "Proposta Comercial Softplus · Impressão" },
      {
        name: "description",
        content: "Renderização dedicada de proposta comercial Softplus para geração de PDF.",
      },
      { property: "og:title", content: "Proposta Comercial Softplus · Impressão" },
      {
        property: "og:description",
        content: "Renderização dedicada de proposta comercial Softplus para geração de PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrintPage,
});

function decodeProposalData(raw: string | undefined): ProposalData | null {
  if (!raw) return null;
  try {
    const json = atob(raw);
    return JSON.parse(json) as ProposalData;
  } catch {
    return null;
  }
}

function PrintPage() {
  const { data } = useSearch({ from: "/print" });
  const proposalData = decodeProposalData(data);

  if (!proposalData) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-foreground text-sm">
          Parâmetro &quot;data&quot; ausente ou inválido.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="print-root flex flex-col items-center gap-8 px-4 py-8">
        <div className="a4-scaler flex flex-col items-center gap-8">
          <ProposalDocument data={proposalData} />
        </div>
      </div>
    </main>
  );
}
