export type PromoPlacement = "sidebar-top" | "sidebar-middle" | "sidebar-bottom" | "inline-after-intro" | "inline-mid" | "inline-end" | "homepage";
export type PromoType = "merch" | "amazon" | "product";

export type Promo = {
  id: string;
  type: PromoType;
  placement: PromoPlacement[];
  title: string;
  description: string;
  image: string;
  label: string;
  cta: string;
  url: string;
  target?: {
    sites?: string[];
    categories?: string[];
    tags?: string[];
  };
};

export const promotions: Promo[] = [
  {
    id: "dissent-defy-disobey",
    type: "merch",
    placement: ["homepage", "sidebar-top", "inline-mid"],
    title: "Dissent. Defy. Disobey. Tee",
    description: "Underground signal energy for operators, analysts, and privacy absolutists.",
    image: "https://advancedpersistentthreads.com/cdn/shop/files/dissent-defy-disobey-black-tee.png",
    label: "MERCH",
    cta: "View drop",
    url: "https://advancedpersistentthreads.com/collections/all",
    target: { sites: ["leakedintel"], tags: ["ransomware", "malware", "red-team"] },
  },
  {
    id: "hacker-mask-word-cloud",
    type: "merch",
    placement: ["sidebar-middle", "inline-end", "homepage"],
    title: "Hacker Mask Word Cloud Tee",
    description: "A clean mask graphic built from the language of intrusion, defense, and resistance.",
    image: "https://advancedpersistentthreads.com/cdn/shop/files/hacker-mask-word-cloud-tee.png",
    label: "MERCH",
    cta: "Open store",
    url: "https://advancedpersistentthreads.com/collections/all",
  },
  {
    id: "red-team-university",
    type: "merch",
    placement: ["sidebar-top", "inline-after-intro", "homepage"],
    title: "Red Team University Tee",
    description: "For readers who learn by breaking assumptions before adversaries break systems.",
    image: "https://advancedpersistentthreads.com/cdn/shop/files/red-team-university-tee.png",
    label: "MERCH",
    cta: "Shop tee",
    url: "https://advancedpersistentthreads.com/collections/all",
    target: { categories: ["Threat Analysis", "Malware"] },
  },
  {
    id: "fancy-bear-operator",
    type: "merch",
    placement: ["sidebar-bottom", "inline-mid"],
    title: "Fancy Bear Operator Hoodie",
    description: "A cold-weather layer for long nights in packet captures and incident rooms.",
    image: "https://advancedpersistentthreads.com/cdn/shop/files/fancy-bear-operator-hoodie.png",
    label: "MERCH",
    cta: "Inspect hoodie",
    url: "https://advancedpersistentthreads.com/collections/all",
    target: { sites: ["leakedintel"] },
  },
  {
    id: "recommended-security-keys",
    type: "amazon",
    placement: ["inline-after-intro", "sidebar-middle"],
    title: "Recommended Security Keys",
    description: "Hardware keys are one of the simplest account takeover defenses available.",
    image: "/promo/security-keys.svg",
    label: "RECOMMENDED",
    cta: "View options",
    url: "https://amazon.com/dp/PLACEHOLDER?tag=affiliate-placeholder",
    target: { sites: ["digitalcybersafety"], tags: ["accounts", "passwords", "mfa"] },
  },
  {
    id: "best-books-on-hacking",
    type: "amazon",
    placement: ["inline-end", "sidebar-bottom", "homepage"],
    title: "Best Books on Hacking",
    description: "A starter shelf for web exploitation, malware analysis, and defensive thinking.",
    image: "/promo/hacking-books.svg",
    label: "AFFILIATE",
    cta: "Browse list",
    url: "https://amazon.com/dp/PLACEHOLDER?tag=affiliate-placeholder",
    target: { sites: ["leakedintel"], categories: ["Malware", "Threat Analysis"] },
  },
  {
    id: "privacy-tools",
    type: "amazon",
    placement: ["inline-mid", "sidebar-top"],
    title: "Privacy Tools",
    description: "Practical devices and references for people reducing personal exposure online.",
    image: "/promo/privacy-tools.svg",
    label: "TOOLS",
    cta: "See kit",
    url: "https://amazon.com/dp/PLACEHOLDER?tag=affiliate-placeholder",
    target: { sites: ["digitalcybersafety"] },
  },
  {
    id: "blue-team-essentials",
    type: "amazon",
    placement: ["sidebar-middle", "inline-end"],
    title: "Blue Team Essentials",
    description: "Books and hardware references for defenders building practical detection muscle.",
    image: "/promo/blue-team.svg",
    label: "RECOMMENDED",
    cta: "Open kit",
    url: "https://amazon.com/dp/PLACEHOLDER?tag=affiliate-placeholder",
  },
];
