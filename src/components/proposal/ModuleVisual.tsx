import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProposalImage } from "@/types/proposal";

const toPascal = (name: string) =>
  name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");

export function ModuleIcon({
  name,
  className,
  tone = "cyan",
}: {
  name?: string | undefined;
  className?: string | undefined;
  tone?: "cyan" | "navy" | "muted" | undefined;
}) {
  const registry = Icons as unknown as Record<string, LucideIcon>;
  const Icon = (name && registry[toPascal(name)]) || Icons.Boxes;

  const tones = {
    cyan: "bg-cyan-soft text-navy-deep",
    navy: "bg-gradient-navy text-primary-foreground",
    muted: "bg-surface text-ink-muted",
  } as const;

  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl",
        tones[tone],
        className,
      )}
    >
      <Icon className="size-[18px]" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

/** Slot de imagem: usa a imagem real quando fornecida, senão um placeholder elegante. */
export function ModuleImageSlot({
  image,
  label,
  className,
  ratio = "aspect-[16/10]",
}: {
  image?: ProposalImage | undefined;
  label: string;
  className?: string | undefined;
  ratio?: string | undefined;
}) {
  if (image?.src) {
    return (
      <div className={cn("overflow-hidden rounded-xl", ratio, className)}>
        <img
          src={image.src}
          alt={image.alt ?? label}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-line bg-gradient-surface relative grid place-items-center overflow-hidden rounded-xl border border-dashed",
        ratio,
        className,
      )}
      aria-label={`Imagem de ${label} — a definir`}
    >
      <div className="halo-graphic absolute inset-0 opacity-40" />
      <div className="relative flex flex-col items-center gap-1.5">
        <Icons.ImageIcon className="text-cyan size-5" strokeWidth={1.6} aria-hidden="true" />
        <span className="text-ink-muted text-[8px] font-semibold tracking-[0.18em] uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
