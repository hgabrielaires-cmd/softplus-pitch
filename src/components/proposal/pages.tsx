import { Boxes, Brain, ChefHat, CreditCard, LineChart, Store, Truck } from "lucide-react";
import ecosystemAsset from "@/assets/softplus-ecossistema.png.asset.json";
import type { ProposalData, ProposalTotals } from "@/types/proposal";
import { PageContainer, type PageMeta } from "./PageContainer";
import { SectionTitle, SoftplusLogo } from "./brand";
import { FeatureCard, ModuleCard, OptionalModuleCard } from "./cards";
import { ModuleImageSlot } from "./ModuleVisual";
import { PlanHero } from "./PlanHero";
import {
  CommercialConditions,
  DiscountHighlight,
  FinalSummary,
  ImplementationCard,
  PriceSummary,
} from "./commercial";

export function ProposalCover({ data }: { data: ProposalData }) {
  const { meta, client } = data;

  return (
    <PageContainer variant="bleed">
      <div className="bg-card flex items-start justify-between px-[14mm] pt-[12mm] pb-6">
        <SoftplusLogo />
        <div className="text-right">
          <div className="text-ink-muted text-[9px] font-bold tracking-[0.24em] uppercase">
            Proposta comercial
          </div>
          <div className="text-navy-deep mt-1 text-[11px] font-bold text-tabular">
            Nº {meta.number}
          </div>
        </div>
      </div>

      <div className="relative mx-[14mm] flex-1 overflow-hidden rounded-[28px]">
        <div className="bg-gradient-navy absolute inset-0" />
        {meta.coverImage?.src ? (
          <img
            src={meta.coverImage.src}
            alt={meta.coverImage.alt ?? "Tecnologia Softplus"}
            className="absolute inset-0 size-full object-cover opacity-45"
            width={1408}
            height={1008}
          />
        ) : null}
        <div className="bg-gradient-navy absolute inset-0 opacity-70" />
        <div className="grid-graphic absolute inset-0 opacity-40" />
        <div className="halo-graphic absolute inset-0" />

        <div className="absolute inset-0 flex flex-col justify-between p-[14mm]">
          <div className="bg-cyan-soft/15 text-cyan-soft w-fit rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.24em] uppercase">
            Softplus · Tecnologia para restaurantes
          </div>

          <div>
            <h1 className="text-primary-foreground font-display max-w-[130mm] text-[40px] leading-[1.05] font-extrabold">
              {meta.headline}
            </h1>
            {meta.subheadline ? (
              <p className="text-cyan-soft mt-4 max-w-[110mm] text-[13px] leading-relaxed">
                {meta.subheadline}
              </p>
            ) : null}
          </div>

          <div className="border-cyan-soft/25 grid grid-cols-3 gap-4 border-t pt-5">
            <div>
              <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
                Preparada para
              </div>
              <div className="text-primary-foreground mt-1.5 text-[13px] font-bold">
                {client.tradeName ?? client.companyName}
              </div>
              <div className="text-cyan-soft text-[9.5px]">{client.companyName}</div>
            </div>
            <div>
              <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
                Data
              </div>
              <div className="text-primary-foreground mt-1.5 text-[13px] font-bold text-tabular">
                {meta.issuedAt}
              </div>
              {client.city ? (
                <div className="text-cyan-soft text-[9.5px]">{client.city}</div>
              ) : null}
            </div>
            <div>
              <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
                Consultor
              </div>
              <div className="text-primary-foreground mt-1.5 text-[13px] font-bold">
                {meta.consultant ?? "Equipe Softplus"}
              </div>
              <div className="text-cyan-soft text-[9.5px]">{meta.consultantContact}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[14mm] py-[10mm]">
        <span className="text-ink-muted text-[9px] tracking-[0.18em] uppercase">
          @softplustecnologia
        </span>
        <div className="flex gap-1.5">
          <span className="bg-navy-deep h-1.5 w-10 rounded-full" />
          <span className="bg-cyan h-1.5 w-6 rounded-full" />
          <span className="bg-cyan-soft h-1.5 w-3 rounded-full" />
        </div>
      </div>
    </PageContainer>
  );
}

const ECOSYSTEM = [
  { icon: Store, title: "Operação", text: "PDV, terminais, comanda e autoatendimento." },
  { icon: ChefHat, title: "Produção", text: "KDS, fichas técnicas e controle de validade." },
  { icon: Truck, title: "Delivery", text: "Loja virtual própria, app e integrações." },
  { icon: LineChart, title: "Gestão", text: "Estoque, compras e indicadores em nuvem." },
  { icon: CreditCard, title: "Financeiro", text: "DRE, fluxo de caixa e conciliação." },
  { icon: Brain, title: "Inteligência", text: "IA aplicada aos dados da sua operação." },
];

export function EcosystemPage({ data, meta }: { data: ProposalData; meta: PageMeta }) {
  return (
    <PageContainer meta={meta}>
      <SectionTitle
        eyebrow="O ecossistema Softplus"
        title="Uma plataforma única, do caixa à decisão."
        description="Tudo conectado em tempo real: o que acontece no salão aparece na gestão, no financeiro e nos seus indicadores — sem planilhas, sem retrabalho."
      />

      <div className="grid grid-cols-3 gap-3.5">
        {ECOSYSTEM.map((e) => (
          <article
            key={e.title}
            className="avoid-break border-line bg-card shadow-card rounded-2xl border p-4"
          >
            <span className="bg-cyan-soft text-navy-deep grid size-9 place-items-center rounded-xl">
              <e.icon className="size-[18px]" strokeWidth={2} />
            </span>
            <h3 className="text-navy-deep font-display mt-3 text-[12.5px] font-bold">{e.title}</h3>
            <p className="text-ink-muted mt-1 text-[10px] leading-snug">{e.text}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-[1.15fr_1fr] items-stretch gap-4">
        <div className="bg-gradient-navy relative overflow-hidden rounded-2xl p-5">
          <div className="grid-graphic absolute inset-0 opacity-50" />
          <div className="halo-graphic absolute inset-0" />
          <div className="relative">
            <Boxes className="text-cyan size-6" strokeWidth={1.8} />
            <h3 className="text-primary-foreground font-display mt-3 text-[18px] leading-tight font-extrabold">
              Integração nativa entre todos os módulos
            </h3>
            <p className="text-cyan-soft mt-2 text-[10.5px] leading-relaxed">
              Você contrata apenas o que precisa hoje e ativa novos módulos conforme a operação
              cresce — sem migração, sem perder histórico.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { v: "100%", l: "Nuvem" },
                { v: "24/7", l: "Disponibilidade" },
                { v: "0", l: "Taxa por pedido" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-primary-foreground font-display text-[20px] font-extrabold text-tabular">
                    {s.v}
                  </div>
                  <div className="text-cyan-soft text-[8.5px] font-semibold tracking-[0.16em] uppercase">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ModuleImageSlot
          label="Imagem institucional"
          ratio="min-h-[46mm]"
          image={data.meta.coverImage?.src ? undefined : undefined}
        />
      </div>
    </PageContainer>
  );
}

export function SolutionPage({
  data,
  totals,
  meta,
  features,
  continued,
}: {
  data: ProposalData;
  totals: ProposalTotals;
  meta: PageMeta;
  features: ProposalData["includedFeatures"];
  continued: boolean;
}) {
  return (
    <PageContainer meta={meta}>
      {continued ? (
        <SectionTitle eyebrow="Sua solução" title="Recursos inclusos no plano (continuação)" />
      ) : (
        <>
          <SectionTitle
            eyebrow="Sua solução"
            title={`Desenhamos o plano ${data.plan.name} para a ${data.client.tradeName ?? data.client.companyName}.`}
            description="Abaixo, exatamente o que está incluso na sua mensalidade — sem letras miúdas."
          />
          <PlanHero plan={data.plan} totals={totals} />
        </>
      )}

      <div>
        <h3 className="text-navy-deep keep-with-next text-[10px] font-bold tracking-[0.2em] uppercase">
          Recursos inclusos no plano
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {features.map((f) => (
            <FeatureCard key={f.id} module={f} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function ModulesPage({
  modules,
  meta,
  continued,
}: {
  modules: ProposalData["addons"];
  meta: PageMeta;
  continued: boolean;
}) {
  return (
    <PageContainer meta={meta}>
      <SectionTitle
        eyebrow="Módulos contratados"
        title={continued ? "Módulos adicionais (continuação)" : "Além do plano, sua operação ganha"}
        {...(continued
          ? {}
          : {
              description:
                "Módulos adicionais já contratados nesta proposta e somados à mensalidade.",
            })}
      />
      <div className="grid grid-cols-3 gap-3.5">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
    </PageContainer>
  );
}

export function OptionalsPage({
  modules,
  meta,
}: {
  modules: ProposalData["optionals"];
  meta: PageMeta;
}) {
  return (
    <PageContainer meta={meta}>
      <SectionTitle
        eyebrow="Potencialize sua operação"
        title="Módulos opcionais, quando fizer sentido"
        description="Sugestões que não estão inclusas nesta contratação e não compõem o total mensal. Podem ser ativadas a qualquer momento."
      />
      <div className="grid grid-cols-2 gap-3.5">
        {modules.map((m) => (
          <OptionalModuleCard key={m.id} module={m} />
        ))}
      </div>
      <div className="border-line text-ink-muted mt-auto rounded-2xl border border-dashed p-4 text-[9.5px] leading-snug">
        Os valores acima são informativos e <strong className="text-navy-deep">não estão</strong>{" "}
        incluídos na mensalidade contratada apresentada nas condições comerciais.
      </div>
    </PageContainer>
  );
}

export function CommercialPage({
  data,
  totals,
  meta,
}: {
  data: ProposalData;
  totals: ProposalTotals;
  meta: PageMeta;
}) {
  return (
    <PageContainer meta={meta}>
      <SectionTitle
        eyebrow="Condições comerciais"
        title="Sua composição de investimento"
        description="Composição detalhada da mensalidade, implantação e condições de pagamento."
      />
      <div className="grid flex-1 grid-cols-[1.25fr_1fr] items-start gap-4">
        <div className="flex flex-col gap-4">
          <PriceSummary data={data} totals={totals} />
          <DiscountHighlight data={data} totals={totals} />
        </div>
        <div className="flex flex-col gap-4">
          <ImplementationCard data={data} totals={totals} />
          <CommercialConditions data={data} />
        </div>
      </div>
    </PageContainer>
  );
}

export function ClosingPage({
  data,
  totals,
  meta,
}: {
  data: ProposalData;
  totals: ProposalTotals;
  meta: PageMeta;
}) {
  return (
    <PageContainer meta={meta}>
      <SectionTitle
        eyebrow="Resumo final"
        title="Em poucos segundos, tudo o que importa."
      />
      <FinalSummary data={data} totals={totals} />

      <div className="avoid-break border-line bg-card flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border p-2">
        <img
          src={ecosystemAsset.url}
          alt="Ecossistema Softplus: gestão web, PDV, monitor de pedidos, comanda eletrônica, delivery e autoatendimento"
          className="max-h-full max-w-full object-contain"
        />
      </div>


      <div className="grid grid-cols-2 gap-3.5">
        <div className="border-line bg-card shadow-card rounded-2xl border p-4">
          <h3 className="text-navy-deep font-display text-[12px] font-bold">Próximos passos</h3>
          <ol className="mt-3 grid gap-2">
            {[
              "Aprovação desta proposta",
              "Assinatura do contrato e pagamento da implantação",
              "Agendamento da instalação e treinamento",
              "Go-live acompanhado pela equipe Softplus",
            ].map((s, i) => (
              <li key={s} className="text-ink flex items-start gap-2.5 text-[10.5px]">
                <span className="bg-navy text-primary-foreground grid size-4 shrink-0 place-items-center rounded-full text-[8px] font-bold">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-gradient-navy relative overflow-hidden rounded-2xl p-4">
          <div className="halo-graphic absolute inset-0" />
          <div className="relative">
            <SoftplusLogo tone="light" />
            <p className="text-cyan-soft mt-4 text-[10.5px] leading-relaxed">
              Fale com o seu consultor para ajustar qualquer ponto desta proposta.
            </p>
            <div className="text-primary-foreground mt-4 text-[12px] font-bold">
              {data.meta.consultant}
            </div>
            <div className="text-cyan-soft text-[10px]">{data.meta.consultantContact}</div>
            {data.conditions.validUntil ? (
              <div className="bg-cyan-soft/15 text-cyan-soft mt-5 rounded-xl px-3 py-2 text-[9.5px] font-semibold">
                Proposta válida até {data.conditions.validUntil}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
