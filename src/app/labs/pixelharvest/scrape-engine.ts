// PixelHarvest — image extraction engine.
//
// A static GitHub Pages site has no backend, and browsers block cross-origin
// fetches of arbitrary HTML (CORS). To scrape a real page client-side we route
// the request through a public CORS proxy (AllOrigins), then parse the returned
// HTML with the browser's own DOMParser and pull every image reference we can
// find — <img src>, lazy-load attributes, <source>/<img srcset>, and social
// meta images — resolving each to an absolute URL.

export type ScrapeResult = {
  images: string[];
  pageTitle: string;
};

// Prepend https:// when the user omits the scheme.
export function normalizeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

export function extFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname.toLowerCase();
    const m = path.match(/\.(jpe?g|png|gif|webp|svg|avif|bmp|ico)(?:$|\?)/);
    if (m) return m[1] === "jpeg" ? "jpg" : m[1];
  } catch {
    /* ignore */
  }
  return "other";
}

// Pull a usable URL out of a srcset attribute (highest-resolution candidate).
function fromSrcset(srcset: string): string | null {
  const parts = srcset
    .split(",")
    .map((s) => s.trim().split(/\s+/)[0])
    .filter(Boolean);
  return parts.length ? parts[parts.length - 1] : null;
}

function absolutize(url: string, base: string): string | null {
  if (!url) return null;
  const u = url.trim();
  if (u.startsWith("data:") || u.startsWith("blob:") || u.startsWith("javascript:")) return null;
  try {
    return new URL(u, base).href;
  } catch {
    return null;
  }
}

export function extractImages(html: string, baseUrl: string): ScrapeResult {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const found = new Set<string>();
  const add = (raw: string | null | undefined) => {
    if (!raw) return;
    const abs = absolutize(raw, baseUrl);
    if (abs && /^https?:\/\//i.test(abs)) found.add(abs);
  };

  // <img>: src, common lazy-load attributes, and srcset.
  doc.querySelectorAll("img").forEach((img) => {
    add(img.getAttribute("src"));
    add(img.getAttribute("data-src"));
    add(img.getAttribute("data-lazy-src"));
    add(img.getAttribute("data-original"));
    const ss = img.getAttribute("srcset") || img.getAttribute("data-srcset");
    if (ss) add(fromSrcset(ss));
  });

  // <picture><source srcset>
  doc.querySelectorAll("source[srcset]").forEach((s) => add(fromSrcset(s.getAttribute("srcset") || "")));

  // Social / SEO preview images.
  doc.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"], meta[itemprop="image"]').forEach((m) =>
    add(m.getAttribute("content")),
  );

  // Favicons / touch icons.
  doc.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((l) => add(l.getAttribute("href")));

  return {
    images: Array.from(found),
    pageTitle: doc.querySelector("title")?.textContent?.trim() || "",
  };
}

// Fetch a page through a CORS proxy and extract its images.
export async function harvest(url: string): Promise<ScrapeResult> {
  const proxied = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxied);
  if (!res.ok) throw new Error(`Proxy responded with ${res.status}`);
  const data: { contents?: string; status?: { http_code?: number } } = await res.json();
  if (!data.contents) throw new Error("The page returned no readable HTML.");
  return extractImages(data.contents, url);
}

export const SAMPLE_URL = "https://en.wikipedia.org/wiki/Indonesia";
