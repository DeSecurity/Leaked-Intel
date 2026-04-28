# Classified Archive Engine

A reusable Markdown-driven cyber media platform for independent sites such as `digitalcybersafety.com` and `leakedintel.com`.

## Workflow

1. Create a Markdown file in `src/content/articles`.
2. Add frontmatter metadata.
3. Write the article body.
4. Push to GitHub.
5. GitHub Actions builds the static site and publishes the updated archive.

No CMS. No backend. No manual publishing panel.

## Site switching

Set `VITE_SITE_KEY` before building:

- `digitalcybersafety` — consumer cyber safety tone
- `leakedintel` — technical threat intelligence tone

Example:

```bash
VITE_SITE_KEY=digitalcybersafety bun run build
VITE_SITE_KEY=leakedintel bun run build
```

## Article frontmatter

```md
---
title: "Article title"
subtitle: "Dek / subtitle"
author: "Research Desk"
publishDate: "2026-04-26"
updatedDate: "2026-04-26"
tags: ["malware", "c2"]
categories: ["Malware", "Threat Analysis"]
site: "leakedintel"
heroLabel: "Sample Report"
seoTitle: "SEO title under 60 chars"
seoDescription: "Meta description under 160 chars."
socialTitle: "Social title"
socialDescription: "Social description"
featured: false
collection: "Malware Lab Notes"
audience: "technical"
---
```

## Promotion system

Promotions live in `src/content/config/promotions.ts` and support:

- placements: sidebar top/middle/bottom, inline after intro/mid/end, homepage
- types: merch, Amazon affiliate, future product
- targeting: site, category, tag
- auto-pulled Amazon wishlist imagery via `scripts/sync-promo-images.mjs` during build

Markdown authors do not need to paste ad code. The layout selects matching promo blocks automatically.

## Search

Search is static and private. It runs locally in the browser against bundled Markdown content. No query backend is required.

## SEO

The build generates:

- `public/sitemap.xml`
- `public/rss.xml`
- route metadata
- canonical URLs
- Article JSON-LD

## GitHub deployment

`.github/workflows/deploy.yml` builds on pushes to `main` and deploys `dist/client` to GitHub Pages. Change the workflow `VITE_SITE_KEY` for each independent site repository.

For project Pages URLs under a repository path, set `GITHUB_PAGES_BASE` and `VITE_SITE_BASE_URL` in the workflow. This repo is configured for `https://desecurity.github.io/Leaked-Intel/`.
