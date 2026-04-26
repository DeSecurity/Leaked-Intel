import { createFileRoute } from "@tanstack/react-router";
import { ArchiveLayout } from "@/components/archive/ArchiveLayout";
import { activeSite } from "@/content/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy — ${activeSite.name}` },
      { name: "description", content: "Privacy approach for this static Markdown-driven cyber media site." },
      { property: "og:title", content: `Privacy — ${activeSite.name}` },
      { property: "og:description", content: "Privacy approach for this static Markdown-driven cyber media site." },
    ],
    links: [{ rel: "canonical", href: `${activeSite.canonicalBase}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <ArchiveLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Trust file</p>
        <h1 className="mt-3 font-display text-5xl font-black uppercase">Privacy</h1>
        <div className="prose-archive mt-8">
          <p>This publishing system is designed to run as a static site with no CMS and no backend publishing database.</p>
          <h2>Search</h2>
          <p>Search runs locally in your browser against the static article index. Queries do not need to be sent to a server.</p>
          <h2>Logs and analytics</h2>
          <p>If analytics are enabled by a site owner, they should be privacy-respecting and configured without selling personal information.</p>
          <h2>External links</h2>
          <p>Promo and affiliate links may take you to external websites with their own privacy practices.</p>
        </div>
      </section>
    </ArchiveLayout>
  );
}
