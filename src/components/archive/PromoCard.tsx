import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Promo } from "@/lib/content";

export function PromoCard({ promo, compact = false }: { promo: Promo; compact?: boolean }) {
  const images = promo.imageSet?.length ? promo.imageSet : promo.image ? [{ src: promo.image, alt: promo.imageAlt ?? promo.title }] : [];

  return (
    <a
      href={promo.url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="group block overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative min-h-24 bg-[image:var(--gradient-promo)] p-4">
        <div className="absolute inset-0 opacity-40 [background-image:var(--pattern-grid)]" />
        {images.length > 0 && (
          <div className="absolute inset-x-4 bottom-3 flex h-20 items-end justify-end gap-2 overflow-hidden opacity-90">
            {images.slice(0, compact ? 2 : 4).map((image) => (
              <img
                key={`${promo.id}-${image.src}`}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-16 w-16 rounded border border-border bg-background object-contain p-1 shadow-[var(--shadow-card)] transition duration-300 group-hover:-translate-y-1"
              />
            ))}
          </div>
        )}
        <div className="relative flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-sm border border-primary/50 bg-background/70 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
            <ShieldCheck className="size-3" /> {promo.label}
          </span>
          <ExternalLink className="size-4 text-muted-foreground transition group-hover:text-primary" />
        </div>
        {!compact && <div className="relative mt-20 h-px bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0" />}
      </div>
      <div className={compact ? "p-3" : "p-4"}>
        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-foreground">{promo.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{promo.description}</p>
        <span className="mt-4 inline-flex font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {promo.cta}
        </span>
      </div>
    </a>
  );
}
