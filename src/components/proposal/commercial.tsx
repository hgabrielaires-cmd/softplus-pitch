import { ArrowRight, CalendarClock, CreditCard, GraduationCap, ShieldCheck } from "lucide-react";
import { brl, moduleTotals, percent } from "@/lib/proposal";
import type { ProposalData, ProposalTotals } from "@/types/proposal";

/** Composição item a item: plano + adicionais, tabela x negociado. */
export function PriceSummary({ data, totals }: { data: ProposalData; totals: ProposalTotals }) {
  const rows = [
    {
      label: `Plano ${data.plan.name}`,
      detail: "Mensalidade base da plataforma",
      qty: 1,
      list: totals.planList,
      net: totals.planNegotiated,
    },
    ...data.addons.map((m) => {
      const t = moduleTotals(m);
      return {
        label: m.name,
        detail: m.description,
        qty: m.quantity ?? 1,
        list: t.list,
        net: t.negotiated,
      };
    }),
  ];

  return (
    <div className="avoid-break border-line bg-card shadow-card overflow-hidden rounded-2xl border">
      <div className="bg-navy-deep text-primary-foreground grid grid-cols-[minmax(0,1fr)_44px_78px_84px] gap-2 px-4 py-2.5 text-[8.5px] font-bold tracking-[0.16em] uppercase">
        <span>Item</span>
        <span className="text-center">Qtd</span>
        <span className="text-right">Tabela</span>
        <span className="text-right">Negociado</span>
      </div>

      {rows.map((r) => (
        <div
          key={r.label}
          className="border-line grid grid-cols-[minmax(0,1fr)_44px_78px_84px] items-center gap-2 border-b px-4 py-2.5 last:border-b-0"
        >
          <div className="min-w-0">
            <div className="text-navy-deep truncate text-[11px] font-bold">{r.label}</div>
            <div className="text-ink-muted truncate text-[9px]">{r.detail}</div>
          </div>
          <div className="text-ink text-center text-[10.5px] font-semibold text-tabular">{r.qty}</div>
          <div className="text-ink-muted text-right text-[10px] text-tabular">
            {r.list > r.net ? <span className="line-through">{brl(r.list)}</span> : brl(r.list)}
          </div>
          <div className="text-navy-deep text-right text-[11.5px] font-bold text-tabular">
            {brl(r.net)}
          </div>
        </div>
      ))}

      <div className="bg-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3">
        <span className="text-navy-deep text-[10px] font-bold tracking-[0.16em] uppercase">
          Mensalidade contratada
        </span>
        <div className="text-right">
          {totals.monthlyDiscount > 0 ? (
            <span className="text-ink-muted mr-2 text-[10px] line-through text-tabular">
              {brl(totals.monthlyList)}
            </span>
          ) : null}
          <span className="text-navy-deep font-display text-[17px] font-extrabold text-tabular">
            {brl(totals.monthlyNegotiated)}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Destaque de promoção — só renderiza quando existe vantagem real. */
export function DiscountHighlight({
  data,
  totals,
}: {
  data: ProposalData;
  totals: ProposalTotals;
}) {
  if (!totals.hasPromotion) return null;
  const promo = data.promotion!;

  return (
    <div className="avoid-break bg-gradient-navy shadow-hero relative overflow-hidden rounded-2xl">
      <div className="grid-graphic absolute inset-0 opacity-50" />
      <div className="halo-graphic absolute inset-0" />
      <div className="relative p-6">
        <div className="text-cyan-soft flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] uppercase">
          <span className="bg-gradient-cyan h-[3px] w-6 rounded-full" />
          {promo.label}
          {promo.discountPercent ? ` · ${percent(promo.discountPercent)} off` : ""}
        </div>

        <div className="mt-4 grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-5">
          <div>
            <div className="text-cyan-soft/70 text-[8.5px] font-bold tracking-[0.2em] uppercase">
              De
            </div>
            <div className="text-cyan-soft/70 font-display text-[20px] font-bold line-through text-tabular">
              {brl(totals.monthlyNegotiated)}
            </div>
          </div>

          <ArrowRight className="text-cyan size-5" strokeWidth={2.5} aria-hidden="true" />

          <div>
            <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">Por</div>
            <div className="text-primary-foreground font-display text-[34px] leading-none font-extrabold text-tabular">
              {brl(totals.promoMonthly)}
              <span className="text-cyan-soft text-[12px] font-semibold">/mês</span>
            </div>
            <div className="text-cyan-soft mt-1 text-[10px] font-semibold">
              Primeiros {totals.promoMonths} meses
            </div>
          </div>
        </div>

        <div className="border-cyan-soft/20 mt-5 flex items-end justify-between border-t pt-4">
          <div className="text-cyan-soft max-w-[95mm] text-[9.5px] leading-snug">
            {promo.note ?? "Condição válida para contratação dentro da validade da proposta."}
          </div>
          <div className="text-right">
            <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
              Economia no período
            </div>
            <div className="text-primary-foreground font-display text-[22px] font-extrabold text-tabular">
              {brl(totals.promoSavings)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImplementationCard({
  data,
  totals,
}: {
  data: ProposalData;
  totals: ProposalTotals;
}) {
  const impl = data.implementation;

  return (
    <div className="avoid-break border-line bg-card shadow-card rounded-2xl border p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="bg-cyan-soft text-navy-deep grid size-9 shrink-0 place-items-center rounded-xl">
              <GraduationCap className="size-[18px]" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <h3 className="text-navy-deep font-display text-[13px] font-bold">{impl.title}</h3>
              {impl.description ? (
                <p className="text-ink-muted text-[10px]">{impl.description}</p>
              ) : null}
            </div>
          </div>

          {impl.bullets?.length ? (
            <ul className="mt-3 grid gap-1.5">
              {impl.bullets.map((b) => (
                <li key={b} className="text-ink flex items-start gap-2 text-[10px]">
                  <ShieldCheck className="text-cyan mt-[1px] size-3 shrink-0" strokeWidth={2.4} />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="text-right">
          {totals.implementationSavings > 0 ? (
            <div className="text-ink-muted text-[10px] line-through text-tabular">
              {brl(totals.implementationList)}
            </div>
          ) : null}
          <div className="text-navy-deep font-display text-[26px] leading-none font-extrabold text-tabular">
            {brl(totals.implementationNegotiated)}
          </div>
          <div className="text-ink-muted mt-1 text-[9px] font-semibold tracking-[0.14em] uppercase">
            Pagamento único
          </div>
          {totals.implementationSavings > 0 ? (
            <div className="bg-success-soft text-success mt-2 inline-block rounded-full px-2 py-1 text-[9px] font-bold text-tabular">
              Economia de {brl(totals.implementationSavings)}
            </div>
          ) : null}
        </div>
      </div>

      {impl.paymentCondition ? (
        <div className="border-line text-ink-muted mt-4 flex items-center gap-2 border-t pt-3 text-[10px]">
          <CreditCard className="text-cyan size-3.5" strokeWidth={2.2} />
          <span className="text-ink font-semibold">Condição de pagamento:</span>
          {impl.paymentCondition}
        </div>
      ) : null}
    </div>
  );
}

export function CommercialConditions({ data }: { data: ProposalData }) {
  const c = data.conditions;
  const items = [
    c.billingCycle ? { icon: CalendarClock, label: "Faturamento", value: c.billingCycle } : null,
    c.paymentMethods?.length
      ? { icon: CreditCard, label: "Formas de pagamento", value: c.paymentMethods.join(" · ") }
      : null,
    c.contractTerm ? { icon: ShieldCheck, label: "Vigência", value: c.contractTerm } : null,
    c.validUntil
      ? { icon: CalendarClock, label: "Validade da proposta", value: c.validUntil }
      : null,
  ].filter(Boolean) as { icon: typeof CalendarClock; label: string; value: string }[];

  if (items.length === 0 && !c.notes?.length) return null;

  return (
    <div className="avoid-break border-line bg-surface rounded-2xl border p-5">
      <h3 className="text-navy-deep font-display text-[12px] font-bold tracking-[0.16em] uppercase">
        Condições comerciais
      </h3>
      {items.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {items.map((it) => (
            <div key={it.label} className="border-line bg-card flex gap-2.5 rounded-xl border p-3">
              <it.icon className="text-cyan mt-[2px] size-3.5 shrink-0" strokeWidth={2.2} />
              <div className="min-w-0">
                <div className="text-ink-muted text-[8.5px] font-bold tracking-[0.16em] uppercase">
                  {it.label}
                </div>
                <div className="text-navy-deep text-[10.5px] font-semibold">{it.value}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {c.notes?.length ? (
        <ul className="mt-3 grid gap-1">
          {c.notes.map((n) => (
            <li key={n} className="text-ink-muted text-[9px] leading-snug">
              · {n}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Fechamento: o que contrata, quanto paga por mês, implantação e condições. */
export function FinalSummary({ data, totals }: { data: ProposalData; totals: ProposalTotals }) {
  const monthly = totals.hasPromotion ? totals.promoMonthly : totals.monthlyNegotiated;

  return (
    <div className="avoid-break bg-gradient-navy shadow-hero relative overflow-hidden rounded-3xl">
      <div className="grid-graphic absolute inset-0 opacity-50" />
      <div className="relative grid grid-cols-3 divide-x divide-white/10">
        <div className="p-6">
          <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
            O que está contratando
          </div>
          <div className="text-primary-foreground font-display mt-2 text-[18px] leading-tight font-extrabold">
            Plano {data.plan.name}
          </div>
          <div className="text-cyan-soft mt-1 text-[10px]">
            {data.includedFeatures.length} recursos inclusos
            {data.addons.length > 0 ? ` · ${data.addons.length} módulos adicionais` : ""}
          </div>
        </div>

        <div className="p-6">
          <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
            Mensalidade
          </div>
          <div className="text-primary-foreground font-display mt-2 text-[26px] leading-none font-extrabold text-tabular">
            {brl(monthly)}
          </div>
          <div className="text-cyan-soft mt-1 text-[10px]">
            {totals.hasPromotion
              ? `nos primeiros ${totals.promoMonths} meses · depois ${brl(totals.monthlyNegotiated)}`
              : "por mês"}
          </div>
        </div>

        <div className="p-6">
          <div className="text-cyan text-[8.5px] font-bold tracking-[0.2em] uppercase">
            Implantação
          </div>
          <div className="text-primary-foreground font-display mt-2 text-[26px] leading-none font-extrabold text-tabular">
            {brl(totals.implementationNegotiated)}
          </div>
          <div className="text-cyan-soft mt-1 text-[10px]">
            {data.implementation.paymentCondition ?? "Pagamento único"}
          </div>
        </div>
      </div>
      <div className="bg-gradient-cyan relative h-1.5 w-full" />
    </div>
  );
}
