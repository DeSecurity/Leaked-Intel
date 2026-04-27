import { writeFile } from "node:fs/promises";

const promos = [
  {
    id: "amazon-apt-operator-kit",
    url: "https://www.amazon.com/gp/aw/ls?&lid=19CKWOIRSV7J&ty=wishlist&filter=unpurchased&sort=date-added&viewType=list",
  },
  {
    id: "amazon-red-team-reading-list",
    url: "https://www.amazon.com/gp/aw/ls?&lid=OIW8YO8YJ6G&ty=wishlist&filter=unpurchased&sort=date-added&viewType=list",
  },
];

function decode(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

async function pullImages(url) {
  const response = await fetch(url, {
    headers: {
      "accept-language": "en-US,en;q=0.9",
      "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
    },
  });
  if (!response.ok) return [];
  const html = await response.text();
  const matches = [...html.matchAll(/<img[^>]+alt="([^"]{5,180})"[^>]+src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?\.(?:jpg|png))"/g)];
  return matches.slice(0, 4).map(([, alt, src]) => ({ src: decode(src), alt: decode(alt) }));
}

const imageMap = Object.fromEntries(await Promise.all(promos.map(async (promo) => [promo.id, await pullImages(promo.url)])));
const source = `export const promoImages = ${JSON.stringify(imageMap, null, 2)} satisfies Record<string, { src: string; alt: string }[]>;\n`;

await writeFile(new URL("../src/content/config/promo-images.generated.ts", import.meta.url), source);