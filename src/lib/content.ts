import { activeSite, activeSiteKey } from "@/content/config/site";
import { promotions, type Promo, type PromoPlacement } from "@/content/config/promotions";

export type ArticleMeta = {
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  updatedDate: string;
  tags: string[];
  categories: string[];
  site: string;
  heroLabel: string;
  seoTitle: string;
  seoDescription: string;
  socialTitle: string;
  socialDescription: string;
  featured?: boolean;
  collection?: string;
  audience: "consumer" | "technical";
};

export type Article = ArticleMeta & {
  slug: string;
  body: string;
  excerpt: string;
  readingTime: string;
  headings: { id: string; text: string; level: number }[];
  html: string;
};

const articleModules = import.meta.glob("/src/content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseList(value: string) {
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^['\"]|['\"]$/g, ""))
    .filter(Boolean);
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Article is missing frontmatter");
  const meta: Record<string, string | string[] | boolean> = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const rawValue = line.slice(index + 1).trim();
    if (rawValue.startsWith("[")) meta[key] = parseList(rawValue);
    else if (rawValue === "true" || rawValue === "false") meta[key] = rawValue === "true";
    else meta[key] = rawValue.replace(/^['\"]|['\"]$/g, "");
  }
  return { meta: meta as unknown as ArticleMeta, body: match[2].trim() };
}

function inlineMarkdown(text: string) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="nofollow noopener" target="_blank">$1</a>');
}

function renderMarkdown(body: string) {
  const headings: Article["headings"] = [];
  const lines = body.split("\n");
  let html = "";
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      html += `<p>${inlineMarkdown(paragraph.join(" "))}</p>`;
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      html += `<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`;
      list = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html += `<pre><code>${code.join("\n").replace(/</g, "&lt;")}</code></pre>`;
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      headings.push({ id, text, level });
      html += `<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`;
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  return { html, headings };
}

function toArticle(path: string, raw: unknown): Article {
  const { meta, body } = parseFrontmatter(String(raw));
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? slugify(meta.title);
  const words = body.split(/\s+/).filter(Boolean).length;
  const rendered = renderMarkdown(body);
  return {
    ...meta,
    slug,
    body,
    excerpt: meta.subtitle,
    readingTime: `${Math.max(2, Math.ceil(words / 220))} min read`,
    headings: rendered.headings,
    html: rendered.html,
  };
}

export const allArticles = Object.entries(articleModules)
  .map(([path, raw]) => toArticle(path, raw))
  .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

export const articles = allArticles.filter((article) => article.site === activeSiteKey || article.site === "base");
export const featuredArticle = articles.find((article) => article.featured) ?? articles[0];

export function getArticle(slug: string) {
  return allArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article) {
  return allArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score:
        candidate.tags.filter((tag) => article.tags.includes(tag)).length +
        candidate.categories.filter((category) => article.categories.includes(category)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.article);
}

export function getAdjacentArticles(article: Article) {
  const index = allArticles.findIndex((candidate) => candidate.slug === article.slug);
  return { previous: allArticles[index + 1], next: allArticles[index - 1] };
}

export function getPromos(placement: PromoPlacement, article?: Pick<Article, "site" | "categories" | "tags">) {
  return promotions.filter((promo) => {
    if (!promo.placement.includes(placement)) return false;
    if (!article || !promo.target) return true;
    const siteMatch = !promo.target.sites || promo.target.sites.includes(article.site);
    const categoryMatch = !promo.target.categories || promo.target.categories.some((category) => article.categories.includes(category));
    const tagMatch = !promo.target.tags || promo.target.tags.some((tag) => article.tags.includes(tag));
    return siteMatch && categoryMatch && tagMatch;
  });
}

export function groupByCategory() {
  return articles.reduce<Record<string, Article[]>>((groups, article) => {
    for (const category of article.categories) {
      groups[category] = [...(groups[category] ?? []), article];
    }
    return groups;
  }, {});
}

export function articleUrl(article: Pick<Article, "slug">) {
  return `${activeSite.canonicalBase}/articles/${article.slug}`;
}

export type { Promo };
