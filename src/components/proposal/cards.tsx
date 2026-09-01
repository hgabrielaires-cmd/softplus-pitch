import { Check, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, categoryLabel, moduleTotals } from "@/lib/proposal";
import type { ProposalModule } from "@/types/proposal";
import { ModuleIcon, ModuleImageSlot } from "./ModuleVisual";

/** Recurso incluído no plano — leve, sem preço. */
export function FeatureCard({ module }: { module: ProposalModule }) {
  return (
    <article className="avoid-break border-line bg-card shadow-card flex gap-3 rounded-2xl border p-3.5">
      <ModuleIcon name={module.icon} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-navy-deep font-display truncate text-[12px] font-bold">
            {module.name}
          </h3>
          {module.quantity && module.quantity > 1 ? (
            <span className="bg-navy text-primary-foreground rounded-full px-1.5 py-0.5 text-[8px] font-bold text-tabular">
              {module.quantity}x
            </span>
          ) : null}
        </div>
        <p className="text-ink-muted mt-1 text-[10px] leading-snug">{module.description}</p>
        {module.highlights?.length ? (
          <ul className="mt-2 flex flex-wrap gap-1">
            {module.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="bg-surface text-navy-soft rounded-md px-1.5 py-0.5 text-[8.5px] font-medium"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/** Módulo contratado (adicional) — com imagem, categoria, quantidade e preço. */
export function ModuleCard({ module }: { module: ProposalModule }) {
  const { list, negotiated } = moduleTotals(module);
  const hasDiscount = list > negotiated;

  return (
    <article className="avoid-break border-line bg-card shadow-card overflow-hidden rounded-2xl border">
      <ModuleImageSlot image={module.image} label={module.name} ratio="aspect-[16/7]" />
      <div className="flex flex-col gap-2 p-3.5">
        <div className="flex items-start gap-3">
          <ModuleIcon name={module.icon} />
          <div className="min-w-0 flex-1">
            <div className="text-cyan text-[8px] font-bold tracking-[0.18em] uppercase">
              {categoryLabel[module.category]}
            </div>
            <h3 className="text-navy-deep font-display text-[12.5px] leading-tight font-bold">
              {module.name}
            </h3>
          </div>
          {module.quantity && module.quantity > 1 ? (
            <span className="bg-cyan-soft text-navy-deep shrink-0 rounded-lg px-2 py-1 text-[9px] font-bold text-tabular">
              {module.quantity} un.
            </span>
          ) : null}
        </div>

        <p className="text-ink-muted text-[10px] leading-snug">{module.description}</p>

        <div className="border-line mt-auto flex items-end justify-between border-t pt-2.5">
          <span className="bg-success-soft text-success inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-bold uppercase">
            <Plus className="size-2.5" strokeWidth={3} /> Contratado
          </span>
          <div className="text-right">
            {hasDiscount ? (
              <div className="text-ink-muted text-[9px] line-through text-tabular">{brl(list)}</div>
            ) : null}
            <div className="text-navy-deep font-display text-[13px] font-extrabold text-tabular">
              {brl(negotiated)}
              <span className="text-ink-muted text-[9px] font-semibold">/mês</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Módulo opcional — visualmente separado, NÃO entra no total. */
export function OptionalModuleCard({ module }: { module: ProposalModule }) {
  const { negotiated } = moduleTotals(module);

  return (
    <article className="avoid-break border-cyan/30 bg-cyan-soft/35 relative overflow-hidden rounded-2xl border border-dashed p-3.5">
      <div className="flex items-start gap-3">
        <ModuleIcon name={module.icon} tone="navy" />
        <div className="min-w-0 flex-1">
          <h3 className="text-navy-deep font-display text-[12.5px] leading-tight font-bold">
            {module.name}
          </h3>
          <p className="text-navy-soft mt-1 text-[10px] leading-snug">{module.description}</p>
        </div>
      </div>
      <div className="border-cyan/25 mt-3 flex items-center justify-between border-t pt-2.5">
        <span className="text-navy-soft inline-flex items-center gap-1 text-[8.5px] font-bold tracking-[0.14em] uppercase">
          <Sparkles className="size-3" strokeWidth={2.4} /> Opcional
        </span>
        <div className="text-navy-deep font-display text-[13px] font-extrabold text-tabular">
          + {brl(negotiated)}
          <span className="text-navy-soft text-[9px] font-semibold">/mês</span>
        </div>
      </div>
    </article>
  );
}

export function CheckLine({ children, className }: { children: string; className?: string }) {
  return (
    <li className={cn("text-ink flex items-start gap-2 text-[10.5px] leading-snug", className)}>
      <Check className="text-cyan mt-[2px] size-3 shrink-0" strokeWidth={3} />
      <span>{children}</span>
    </li>
  );
}
