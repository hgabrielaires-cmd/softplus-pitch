import { brl } from "@/lib/proposal";
import type { ProposalPlan, ProposalTotals } from "@/types/proposal";

export function PlanHero({ plan, totals }: { plan: ProposalPlan; totals: ProposalTotals }) {
  const price = totals.hasPromotion ? totals.promoMonthly : totals.planNegotiated;
  const hasPlanDiscount = totals.planNegotiated < totals.planList;

  return (
    <div className="avoid-break bg-gradient-navy shadow-hero relative overflow-hidden rounded-3xl">
      <div className="grid-graphic absolute inset-0 opacity-60" />
      <div className="halo-graphic absolute inset-0" />

      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 p-7">
        <div className="min-w-0">
          {plan.badge ? (
            <span className="bg-cyan-soft/20 text-cyan-soft inline-block rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-[0.2em] uppercase">
              {plan.badge}
            </span>
          ) : null}
          <h3 className="text-primary-foreground font-display mt-3 text-[38px] leading-none font-extrabold">
            Plano {plan.name}
          </h3>
          {plan.tagline ? (
            <p className="text-cyan-soft mt-2 max-w-[95mm] text-[11px] leading-relaxed">
              {plan.tagline}
            </p>
          ) : null}
        </div>

        <div className="text-right">
          {hasPlanDiscount ? (
            <div className="text-cyan-soft/70 text-[11px] line-through text-tabular">
              {brl(totals.planList)}
            </div>
          ) : null}
          <div className="text-primary-foreground font-display text-[34px] leading-none font-extrabold text-tabular">
            {brl(price)}
          </div>
          <div className="text-cyan-soft mt-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
            {totals.hasPromotion ? `por mês · primeiros ${totals.promoMonths} meses` : "por mês"}
          </div>
        </div>
      </div>

      <div className="bg-gradient-cyan relative h-1.5 w-full" />
    </div>
  );
}
