import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer } from "lucide-react";
import { ProposalDocument } from "@/components/proposal/ProposalDocument";
import { scenarios, type ScenarioId } from "@/data/scenarios";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Propostas Comerciais | Softplus" },
      {
        name: "description",
        content:
          "Ambiente de homologação do gerador dinâmico de propostas comerciais Softplus: layout A4, impressão e PDF.",
      },
      { property: "og:title", content: "Gerador de Propostas Comerciais | Softplus" },
      {
        property: "og:description",
        content:
          "Proposta comercial 100% dinâmica em HTML/CSS, pronta para tela, impressão A4 e conversão em PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("promocional");
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];

  return (
    <main className="min-h-screen">
      <div className="no-print border-line bg-card/90 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto grid max-w-[240mm] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-navy-deep font-display truncate text-[15px] font-extrabold">
              Gerador de Propostas · Softplus
            </h1>
            <p className="text-ink-muted truncate text-[11px]">
              Ambiente de homologação · dados mockados · {scenario.data.meta.number}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors",
                  s.id === scenarioId
                    ? "bg-navy text-primary-foreground"
                    : "bg-surface text-ink-muted hover:text-navy",
                )}
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => window.print()}
              className="bg-gradient-cyan text-navy-deep inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold"
            >
              <Printer className="size-3.5" strokeWidth={2.4} /> Imprimir / PDF
            </button>
          </div>
        </div>
      </div>

      <div className="print-root flex flex-col items-center gap-8 px-4 py-8">
        <div className="a4-scaler flex flex-col items-center gap-8">
          <ProposalDocument key={scenario.id} data={scenario.data} />
        </div>
      </div>
    </main>
  );
}
