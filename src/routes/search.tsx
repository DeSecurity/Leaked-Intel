import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/archive/ArticleCard";
import { ArchiveLayout } from "@/components/archive/ArchiveLayout";
import { activeSite } from "@/content/config/site";
import { articles } from "@/lib/content";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: `Search — ${activeSite.name}` },
      { name: "description", content: "Private, static search across the cyber archive." },
      { property: "og:title", content: `Search — ${activeSite.name}` },
      { property: "og:description", content: "Private, static search across the cyber archive." },
    ],
    links: [{ rel: "canonical", href: `${activeSite.canonicalBase}/search` }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return articles;
    return articles.filter((article) =>
      [article.title, article.subtitle, article.author, article.collection, ...article.tags, ...article.categories, article.body]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  return (
    <ArchiveLayout>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Private static search</p>
        <h1 className="mt-3 font-display text-5xl font-black uppercase tracking-wide">Search the archive</h1>
        <div className="relative mt-8 max-w-3xl">
          <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
            placeholder="Search ransomware, password resets, C2, IOCs..."
            className="w-full rounded-lg border border-border bg-card py-4 pl-12 pr-4 font-mono text-sm text-foreground shadow-[var(--shadow-card)] outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{results.length} files matched locally in your browser</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>
    </ArchiveLayout>
  );
}
