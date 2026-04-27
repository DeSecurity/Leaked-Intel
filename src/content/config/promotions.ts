import { promoImages } from "./promo-images.generated";

export type PromoPlacement = "sidebar-top" | "sidebar-middle" | "sidebar-bottom" | "inline-after-intro" | "inline-mid" | "inline-end" | "homepage";
export type PromoType = "merch" | "amazon" | "product";

export type PromoImage = {
  src: string;
  alt: string;
};

export type Promo = {
  id: string;
  type: PromoType;
  placement: PromoPlacement[];
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageSet?: PromoImage[];
  imagePullUrl?: string;
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
    imageAlt: "Dissent Defy Disobey black tee from Advanced Persistent Threads",
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
    imageAlt: "Hacker Mask Word Cloud tee from Advanced Persistent Threads",
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
    imageAlt: "Red Team University tee from Advanced Persistent Threads",
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
    imageAlt: "Fancy Bear Operator hoodie from Advanced Persistent Threads",
    label: "MERCH",
    cta: "Inspect hoodie",
    url: "https://advancedpersistentthreads.com/collections/all",
    target: { sites: ["leakedintel"] },
  },
  {
    id: "amazon-apt-operator-kit",
    type: "amazon",
    placement: ["inline-after-intro", "sidebar-middle", "homepage"],
    title: "APT Operator Kit",
    description: "A curated Amazon list for threat research, offensive-security study, and analyst desk gear.",
    imageSet: promoImages["amazon-apt-operator-kit"],
    imagePullUrl: "https://www.amazon.com/gp/profile/amzn1.account.AGXGWAZEMX27NVCSYLYDAWE4KFPA/list/19CKWOIRSV7J?ccs_id=e92234d5-d3af-42fb-bf42-e1dc2daf87b3",
    label: "AMAZON",
    cta: "Open list",
    url: "https://www.amazon.com/gp/profile/amzn1.account.AGXGWAZEMX27NVCSYLYDAWE4KFPA/list/19CKWOIRSV7J?ccs_id=e92234d5-d3af-42fb-bf42-e1dc2daf87b3",
    target: { sites: ["digitalcybersafety"], tags: ["accounts", "passwords", "mfa"] },
  },
  {
    id: "amazon-red-team-reading-list",
    type: "amazon",
    placement: ["inline-end", "sidebar-bottom", "homepage"],
    title: "Red Team Reading List",
    description: "Books pulled from the live Amazon list for exploitation, malware craft, and modern evasion.",
    imageSet: promoImages["amazon-red-team-reading-list"],
    imagePullUrl: "https://www.amazon.com/gp/aw/ls?&lid=OIW8YO8YJ6G&ty=wishlist&filter=unpurchased&sort=date-added&viewType=list",
    label: "AMAZON",
    cta: "Browse list",
    url: "https://www.amazon.com/gp/aw/ls?&lid=OIW8YO8YJ6G&ty=wishlist&filter=unpurchased&sort=date-added&viewType=list",
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
