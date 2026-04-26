import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "src/content/articles");
const publicDir = path.join(root, "public");
const siteKey = process.env.VITE_SITE_KEY || "leakedintel";
const sites = {
  digitalcybersafety: { name: "Digital Cyber Safety", base: "https://digitalcybersafety.com", description: "Practical cyber safety briefings for everyday people." },
  leakedintel: { name: "Leaked Intel", base: "https://leakedintel.com", description: "Raw malware, ransomware, and threat actor intelligence." },
};
const site = sites[siteKey] || sites.leakedintel;

function parseList(value) {
  return value.replace(/^\[/, "").replace(/\]$/, "").split(",").map((item) => item.trim().replace(/^['\"]|['\"]$/g, "")).filter(Boolean);
}

function parseMarkdown(file) {
  const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${file} is missing frontmatter`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    meta[key] = value.startsWith("[") ? parseList(value) : value.replace(/^['\"]|['\"]$/g, "");
  }
  return { ...meta, slug: file.replace(/\.md$/, "") };
}

const articles = fs.readdirSync(contentDir)
  .filter((file) => file.endsWith(".md"))
  .map(parseMarkdown)
  .filter((article) => article.site === siteKey || article.site === "base")
  .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

fs.mkdirSync(publicDir, { recursive: true });

const urls = [
  { loc: site.base, lastmod: new Date().toISOString().slice(0, 10) },
  { loc: `${site.base}/search`, lastmod: new Date().toISOString().slice(0, 10) },
  { loc: `${site.base}/privacy`, lastmod: new Date().toISOString().slice(0, 10) },
  { loc: `${site.base}/affiliate-disclosure`, lastmod: new Date().toISOString().slice(0, 10) },
  ...articles.map((article) => ({ loc: `${site.base}/articles/${article.slug}`, lastmod: article.updatedDate || article.publishDate })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name}</title>
    <link>${site.base}</link>
    <description>${site.description}</description>
    <atom:link href="${site.base}/rss.xml" rel="self" type="application/rss+xml" />
${articles.map((article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${site.base}/articles/${article.slug}</link>
      <guid>${site.base}/articles/${article.slug}</guid>
      <description><![CDATA[${article.seoDescription || article.subtitle}]]></description>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);
console.log(`Generated sitemap.xml and rss.xml for ${site.name}`);
