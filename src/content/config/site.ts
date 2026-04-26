export type SiteKey = "digitalcybersafety" | "leakedintel";

export type SiteProfile = {
  key: SiteKey;
  name: string;
  domain: string;
  tagline: string;
  audience: string;
  tone: string;
  canonicalBase: string;
};

export const siteProfiles: Record<SiteKey, SiteProfile> = {
  digitalcybersafety: {
    key: "digitalcybersafety",
    name: "Digital Cyber Safety",
    domain: "digitalcybersafety.com",
    tagline: "Practical cyber safety briefings for everyday people.",
    audience: "non-technical",
    tone: "clear, protective, grounded",
    canonicalBase: "https://digitalcybersafety.com",
  },
  leakedintel: {
    key: "leakedintel",
    name: "Leaked Intel",
    domain: "leakedintel.com",
    tagline: "Raw malware, ransomware, and threat actor intelligence.",
    audience: "technical",
    tone: "offensive security, analytical, raw",
    canonicalBase: "https://leakedintel.com",
  },
};

export const activeSiteKey = (import.meta.env.VITE_SITE_KEY as SiteKey | undefined) ?? "leakedintel";
export const activeSite = siteProfiles[activeSiteKey] ?? siteProfiles.leakedintel;

export const navItems = [
  { label: "Archive", to: "/" },
  { label: "Search", to: "/search" },
  { label: "Privacy", to: "/privacy" },
  { label: "Disclosure", to: "/affiliate-disclosure" },
] as const;
