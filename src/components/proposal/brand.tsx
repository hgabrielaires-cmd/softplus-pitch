import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-softplus.png.asset.json";

/** Marca Softplus com a logo oficial em PNG — imprime nítida. */
export function SoftplusLogo({
  className,
  tone = "navy",
  height = 36,
}: {
  className?: string;
  tone?: "navy" | "light";
  height?: number;
}) {
  return (
    <img
      src={logoAsset.url}
      alt="Softplus Tecnologia em Sistemas"
      className={cn(
        "h-auto w-auto shrink-0 object-contain",
        tone === "light" && "brightness-0 invert",
        className,
      )}
      style={{ height }}
    />
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
