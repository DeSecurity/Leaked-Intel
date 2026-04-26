import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, FileText, UserRound } from "lucide-react";
import { ArticleCard } from "@/components/archive/ArticleCard";
import { ArchiveLayout } from "@/components/archive/ArchiveLayout";
import { PromoCard } from "@/components/archive/PromoCard";
import { activeSite } from "@/content/config/site";
import { articleUrl, getAdjacentArticles, getArticle, getPromos, getRelatedArticles } from "@/lib/content";

export const Route = createFileRoute("/articles/$slug")({
  head: ({ params }) => {
    const article = getArticle(params.slug);
    const title = article?.seoTitle ?? "Article not found";
    const description = article?.seoDescription ?? activeSite.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: article?.socialTitle ?? title },
        { property: "og:description", content: article?.socialDescription ?? description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: article ? [{ rel: "canonical", href: articleUrl(article) }] : [],
      scripts: article
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: article.title,
                description: article.seoDescription,
                author: { "@type": "Person", name: article.author },
                datePublished: article.publishDate,
                dateModified: article.updatedDate,
                mainEntityOfPage: articleUrl(article),
              }),
            },
          ]
        : [],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <ArchiveLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">404</p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase">File not found</h1>
          <Link to="/" className="mt-8 inline-flex rounded-md bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground">Return archive</Link>
        </div>
      </ArchiveLayout>
    );
  }

  const related = getRelatedArticles(article);
  const adjacent = getAdjacentArticles(article);
  const sidebarPromos = [
    ...getPromos("sidebar-top", article).slice(0, 1),
    ...getPromos("sidebar-middle", article).slice(0, 1),
    ...getPromos("sidebar-bottom", article).slice(0, 1),
  ];
  const afterIntro = getPromos("inline-after-intro", article)[0];
  const midPromo = getPromos("inline-mid", article)[0];
  const endPromo = getPromos("inline-end", article)[0];
  const split = article.html.split("</p>");
  const intro = split.slice(0, 2).join("</p>") + (split.length > 1 ? "</p>" : "");
  const rest = split.slice(2).join("</p>");

  return (
    <ArchiveLayout>
      <article>
        <header className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
          <div className="absolute inset-0 opacity-40 [background-image:var(--pattern-scan)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-primary">
              <ArrowLeft className="size-4" /> Back to archive
            </Link>
            <div className="mt-10 max-w-4xl">
              <span className="rounded-sm border border-primary/50 bg-background/60 px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-primary">{article.heroLabel}</span>
              <h1 className="mt-6 font-display text-4xl font-black uppercase leading-tight tracking-wide text-foreground sm:text-6xl">{article.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{article.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><UserRound className="size-4 text-primary" /> {article.author}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> {article.publishDate}</span>
                <span className="inline-flex items-center gap-2"><Clock className="size-4 text-primary" /> {article.readingTime}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div className="min-w-0">
            <div className="prose-archive" dangerouslySetInnerHTML={{ __html: intro }} />
            {afterIntro && <div className="my-8"><PromoCard promo={afterIntro} /></div>}
            {midPromo && <div className="my-8"><PromoCard promo={midPromo} /></div>}
            <div className="prose-archive" dangerouslySetInnerHTML={{ __html: rest }} />
            {endPromo && <div className="my-8"><PromoCard promo={endPromo} /></div>}

            <nav className="mt-12 grid gap-4 border-t border-border pt-8 md:grid-cols-2" aria-label="Article navigation">
              {adjacent.previous && <ArticleNav label="Previous file" article={adjacent.previous} icon="left" />}
              {adjacent.next && <ArticleNav label="Next file" article={adjacent.next} icon="right" />}
            </nav>

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Related intelligence</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {related.map((item) => <ArticleCard key={item.slug} article={item} />)}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {article.headings.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary"><FileText className="size-4" /> Table of contents</div>
                <ol className="space-y-2">
                  {article.headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
                      <a href={`#${heading.id}`} className="text-sm text-muted-foreground transition hover:text-primary">{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {sidebarPromos.map((promo) => <PromoCard key={promo.id} promo={promo} compact />)}
          </aside>
        </div>
      </article>
    </ArchiveLayout>
  );
}

function ArticleNav({ label, article, icon }: { label: string; article: { slug: string; title: string }; icon: "left" | "right" }) {
  return (
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="group rounded-lg border border-border bg-card p-4 transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{label}</span>
      <span className="mt-2 flex items-center justify-between gap-3 font-display text-lg font-bold uppercase text-foreground">
        {icon === "left" && <ArrowLeft className="size-4" />} {article.title} {icon === "right" && <ArrowRight className="size-4" />}
      </span>
    </Link>
  );
}
