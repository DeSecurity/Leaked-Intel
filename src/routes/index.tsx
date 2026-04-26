import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Crosshair, ShieldAlert, Signal } from "lucide-react";
import { ArticleCard } from "@/components/archive/ArticleCard";
import { ArchiveLayout } from "@/components/archive/ArchiveLayout";
import { PromoCard } from "@/components/archive/PromoCard";
import { activeSite } from "@/content/config/site";
import { articles, featuredArticle, getPromos, groupByCategory } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${activeSite.name} — Classified Cyber Archive` },
      { name: "description", content: activeSite.tagline },
      { property: "og:title", content: `${activeSite.name} — Classified Cyber Archive` },
      { property: "og:description", content: activeSite.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: activeSite.canonicalBase }],
  }),
  component: Index,
});

function Index() {
  const grouped = groupByCategory();
  const homepagePromos = getPromos("homepage").slice(0, 3);

  return (
    <ArchiveLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="absolute inset-0 opacity-40 [background-image:var(--pattern-scan)]" />
        <div className="mx-auto grid min-h-[78vh] max-w-7xl items-end gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="relative pb-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-primary/50 bg-background/60 px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-primary shadow-[var(--shadow-red)]">
              <Signal className="size-4 animate-pulse" /> Signal acquired
            </div>
            <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-none tracking-wide text-foreground sm:text-7xl lg:text-8xl">
              Classified cyber operations archive
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {activeSite.tagline} Built for Markdown, GitHub pushes, static deployment, and bingeable intelligence discovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/articles/$slug" params={{ slug: featuredArticle.slug }} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-red)] transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Read featured <ArrowRight className="size-4" />
              </Link>
              <Link to="/search" className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Search archive
              </Link>
            </div>
          </div>
          <div className="relative pb-8">
            <div className="rounded-lg border border-primary/40 bg-card/80 p-3 shadow-[var(--shadow-card)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between border-b border-border pb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Crosshair className="size-4 text-primary" /> Featured investigation</span>
                <span>{featuredArticle.readingTime}</span>
              </div>
              <ArticleCard article={featuredArticle} featured />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Collections</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">Bingeable intelligence rows</h2>
          </div>
          <ShieldAlert className="hidden size-8 text-primary sm:block" />
        </div>
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, categoryArticles]) => (
            <section key={category} aria-labelledby={`category-${category}`}>
              <h3 id={`category-${category}`} className="mb-4 font-display text-xl font-bold uppercase tracking-[0.16em] text-foreground">{category}</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-color:var(--primary)_transparent]">
                {categoryArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Promoted drops</p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">Operator gear and field kits</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homepagePromos.map((promo) => <PromoCard key={promo.id} promo={promo} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Latest posts</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">Fresh from the wire</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>
    </ArchiveLayout>
  );
}
