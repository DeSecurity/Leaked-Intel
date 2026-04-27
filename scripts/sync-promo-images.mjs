import { writeFile } from "node:fs/promises";

const promos = [
  {
    id: "amazon-apt-operator-kit",
    url: "https://www.amazon.com/gp/profile/amzn1.account.AGXGWAZEMX27NVCSYLYDAWE4KFPA/list/19CKWOIRSV7J?ccs_id=e92234d5-d3af-42fb-bf42-e1dc2daf87b3",
    fallback: [
      { src: "https://m.media-amazon.com/images/I/41EcjlUimCL._AC_.jpg", alt: "Game controller wall mount storage organizer" },
      { src: "https://m.media-amazon.com/images/I/41v0kpKaj3L._AC_.jpg", alt: "Amazon Basics Toslink digital optical audio cable" },
      { src: "https://m.media-amazon.com/images/I/319-7Uk68eL._AC_.jpg", alt: "FiiO D3 digital to analog audio converter" },
    ],
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

const imageMap = Object.fromEntries(
  await Promise.all(promos.map(async (promo) => {
    const pulled = await pullImages(promo.url);
    return [promo.id, pulled.length ? pulled : (promo.fallback ?? [])];
  })),
);
const source = `export const promoImages = ${JSON.stringify(imageMap, null, 2)} satisfies Record<string, { src: string; alt: string }[]>;\n`;

await writeFile(new URL("../src/content/config/promo-images.generated.ts", import.meta.url), source);