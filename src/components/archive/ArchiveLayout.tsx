import { Link } from "@tanstack/react-router";
import { Search, Terminal } from "lucide-react";
import { activeSite, navItems } from "@/content/config/site";

export function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:var(--pattern-grid)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-vignette)]" />
      <header className="sticky top-0 z-30 border-b border-border bg-background/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex size-10 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary shadow-[var(--shadow-red)]">
              <Terminal className="size-5" />
            </span>
            <span>
              <span className="block font-display text-sm font-bold uppercase tracking-[0.28em] text-foreground">{activeSite.name}</span>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground sm:block">classified archive engine</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeProps={{ className: "text-primary border-primary/40 bg-primary/10" }}
                className="rounded-md border border-transparent px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link to="/search" aria-label="Search archive" className="rounded-md border border-border bg-secondary p-2 text-secondary-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Search className="size-4" />
          </Link>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 border-t border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-[0.18em]">{activeSite.name}</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{activeSite.tagline} Markdown in GitHub. Static output. No CMS. No backend publishing dependency.</p>
          </div>
          <div className="flex gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/affiliate-disclosure" className="hover:text-primary">Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
