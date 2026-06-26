// Brand configuration for each demo lab. Kept as plain data (no "use client")
// so it can be imported by both server layouts and client components. The shared
// shell (shell.tsx) is fully driven by these tokens, so adding another lab is
// just another entry here plus its pages.

export type Brand = {
  name: string;
  parts: [string, string]; // two-tone logo, e.g. ["Copy", "Forge"]
  base: string;
  icon: string; // bootstrap-icons class
  gradient: string; // css gradient used for logo text + accents
  gradClasses: string; // tailwind classes for gradient button backgrounds
  accent: string; // "r,g,b" for borders / glows
  accentText: string; // lighter "r,g,b" for readable accent text on dark bg
  nav: { href: string; label: { en: string; id: string } }[];
  launch?: { href: string; label: { en: string; id: string } };
};

export const COPYFORGE: Brand = {
  name: "CopyForge",
  parts: ["Copy", "Forge"],
  base: "/labs/copyforge",
  icon: "bi-fire",
  gradient: "linear-gradient(120deg, #818cf8, #a78bfa, #e879f9)",
  gradClasses: "from-indigo-500 via-violet-500 to-fuchsia-500",
  accent: "139,92,246",
  accentText: "196,181,253",
  nav: [
    { href: "/labs/copyforge", label: { en: "Overview", id: "Ikhtisar" } },
    { href: "/labs/copyforge/studio", label: { en: "Studio", id: "Studio" } },
  ],
  launch: { href: "/labs/copyforge/studio", label: { en: "Launch Studio", id: "Buka Studio" } },
};

export const PIXELHARVEST: Brand = {
  name: "PixelHarvest",
  parts: ["Pixel", "Harvest"],
  base: "/labs/pixelharvest",
  icon: "bi-images",
  gradient: "linear-gradient(120deg, #34d399, #22d3ee, #2dd4bf)",
  gradClasses: "from-emerald-500 via-teal-500 to-cyan-500",
  accent: "20,184,166",
  accentText: "94,234,212",
  nav: [
    { href: "/labs/pixelharvest", label: { en: "Overview", id: "Ikhtisar" } },
    { href: "/labs/pixelharvest/scraper", label: { en: "Scraper", id: "Scraper" } },
  ],
  launch: { href: "/labs/pixelharvest/scraper", label: { en: "Open Scraper", id: "Buka Scraper" } },
};

export const JARVIS: Brand = {
  name: "Jarvis",
  parts: ["Jar", "vis"],
  base: "/labs/jarvis",
  icon: "bi-eye",
  gradient: "linear-gradient(120deg, #22d3ee, #38bdf8, #818cf8)",
  gradClasses: "from-cyan-400 via-sky-500 to-indigo-500",
  accent: "34,211,238",
  accentText: "165,243,252",
  nav: [],
  // No launch button — activation happens inline on the page with a camera prompt.
};
