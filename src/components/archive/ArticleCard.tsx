import { Link } from "@tanstack/react-router";
import { Clock, Radio } from "lucide-react";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className={
        featured
          ? "group grid overflow-hidden rounded-lg border border-primary/30 bg-card shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-primary"
          : "group min-w-72 overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-primary/60"
      }
    >
      <div className="relative min-h-44 bg-[image:var(--gradient-panel)] p-5">
        <div className="absolute inset-0 opacity-50 [background-image:var(--pattern-scan)]" />
        <div className="relative flex items-center justify-between">
          <span className="rounded-sm border border-primary/40 bg-background/60 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-primary">
            {article.heroLabel}
          </span>
          <Radio className="size-4 text-primary" />
        </div>
        <div className="relative mt-14 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-sm bg-secondary px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>{article.collection}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {article.readingTime}</span>
        </div>
        <h2 className={featured ? "mt-3 font-display text-3xl font-bold uppercase leading-tight text-foreground" : "mt-3 font-display text-xl font-bold uppercase leading-tight text-foreground"}>
          {article.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.subtitle}</p>
      </div>
    </Link>
  );
}
