import { createFileRoute } from "@tanstack/react-router";
import { ArchiveLayout } from "@/components/archive/ArchiveLayout";
import { activeSite } from "@/content/config/site";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: [
      { title: `Affiliate Disclosure — ${activeSite.name}` },
      { name: "description", content: "Affiliate and promotion disclosure for recommended products and merch placements." },
      { property: "og:title", content: `Affiliate Disclosure — ${activeSite.name}` },
      { property: "og:description", content: "Affiliate and promotion disclosure for recommended products and merch placements." },
    ],
    links: [{ rel: "canonical", href: `${activeSite.canonicalBase}/affiliate-disclosure` }],
  }),
  component: DisclosurePage,
});

function DisclosurePage() {
  return (
    <ArchiveLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Disclosure</p>
        <h1 className="mt-3 font-display text-5xl font-black uppercase">Affiliate disclosure</h1>
        <div className="prose-archive mt-8">
          <p>This site may include affiliate links, merch links, and promotional placements. If you buy through those links, the site may earn a commission at no additional cost to you.</p>
          <h2>Promotion policy</h2>
          <p>Promotions are configured statically by placement, site, category, and tag. They do not require a CMS or tracking-heavy ad platform.</p>
          <h2>Editorial independence</h2>
          <p>Recommendations should support the article context and reader safety. Promotional modules are labeled with terms such as MERCH, RECOMMENDED, TOOL, or AFFILIATE.</p>
        </div>
      </section>
    </ArchiveLayout>
  );
}
