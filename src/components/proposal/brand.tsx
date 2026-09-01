import { cn } from "@/lib/utils";

/** Marca Softplus em SVG — vetorial, imprime nítido, sem depender de imagem. */
export function SoftplusLogo({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "light";
}) {
  const mark = tone === "light" ? "text-primary-foreground" : "text-navy";
  const sub = tone === "light" ? "text-cyan-soft" : "text-ink-muted";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 48 48" className={cn("h-9 w-9 shrink-0", mark)} aria-hidden="true">
        <rect
          x="4.5"
          y="4.5"
          width="39"
          height="39"
          rx="12"
          transform="rotate(-8 24 24)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
        />
        <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <line x1="15" y1="30" x2="27" y2="28.5" />
          <line x1="16" y1="24" x2="32" y2="21.5" />
          <line x1="17" y1="18" x2="27" y2="16.5" />
        </g>
      </svg>
      <div className="leading-none">
        <div className={cn("font-display text-xl font-extrabold tracking-tight", mark)}>
          softplus
        </div>
        <div className={cn("mt-1 text-[6.5px] font-semibold tracking-[0.28em] uppercase", sub)}>
          Tecnologia em Sistemas
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  tone = "navy",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "navy" | "light";
}) {
  return (
    <header className={cn("keep-with-next", tone === "light" && "text-primary-foreground")}>
      {eyebrow ? (
        <div
          className={cn(
            "mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase",
            tone === "light" ? "text-cyan-soft" : "text-cyan",
          )}
        >
          <span className="bg-gradient-cyan inline-block h-[3px] w-6 rounded-full" />
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-2xl leading-tight font-extrabold",
          tone === "light" ? "text-primary-foreground" : "text-navy-deep",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-1.5 max-w-[135mm] text-[11px] leading-relaxed",
            tone === "light" ? "text-cyan-soft" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
