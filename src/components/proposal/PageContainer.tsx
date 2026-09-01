import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SoftplusLogo } from "./brand";

export interface PageMeta {
  proposalNumber: string;
  clientName: string;
  issuedAt: string;
  pageNumber: number;
  totalPages: number;
}

export function ProposalHeader({ meta }: { meta: PageMeta }) {
  return (
    <div className="border-line flex items-start justify-between border-b px-[16mm] pt-[8mm] pb-3">
      <SoftplusLogo />
      <div className="text-right">
        <div className="text-navy-deep text-[10px] font-bold tracking-[0.2em] uppercase">
          Proposta {meta.proposalNumber}
        </div>
        <div className="text-ink-muted mt-1 text-[10px]">{meta.clientName}</div>
      </div>
    </div>
  );
}

export function ProposalFooter({ meta }: { meta: PageMeta }) {
  return (
    <div className="border-line text-ink-muted mt-auto flex items-center justify-between border-t px-[16mm] pt-2.5 pb-[7mm] text-[9px]">
      <span>softplus · tecnologia em sistemas · @softplustecnologia</span>
      <span>Emitida em {meta.issuedAt}</span>
      <span className="text-navy font-semibold text-tabular">
        {String(meta.pageNumber).padStart(2, "0")} / {String(meta.totalPages).padStart(2, "0")}
      </span>
    </div>
  );
}

export function PageContainer({
  children,
  meta,
  variant = "default",
  className,
}: {
  children: ReactNode;
  meta?: PageMeta;
  variant?: "default" | "bleed";
  className?: string;
}) {
  if (variant === "bleed") {
    return (
      <section className={cn("a4-page shadow-hero rounded-none", className)}>{children}</section>
    );
  }

  return (
    <section className={cn("a4-page shadow-card border-line border", className)}>
      {meta ? <ProposalHeader meta={meta} /> : null}
      <div className="flex flex-1 flex-col gap-5 px-[16mm] py-[7mm]">{children}</div>
      {meta ? <ProposalFooter meta={meta} /> : null}
    </section>
  );
}
