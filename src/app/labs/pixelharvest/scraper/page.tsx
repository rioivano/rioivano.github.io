"use client";

import { useMemo, useState } from "react";
import { harvest, normalizeUrl, extFromUrl, SAMPLE_URL } from "../scrape-engine";
import { Eyebrow, useLang } from "../../_shared/shell";
import { PIXELHARVEST as B } from "../../_shared/brands";

const T = {
  en: {
    eyebrow: "The Scraper", title: "Harvest images from a page",
    sub: "Paste any public URL. PixelHarvest fetches it, extracts every image, and lays them out below.",
    placeholder: "example.com or https://example.com/page",
    harvest: "Harvest", harvesting: "Harvesting…", sample: "Try a sample page",
    emptyTitle: "Images will appear here",
    emptyBody: "Paste a URL above and hit Harvest — or load a sample page to see it in action.",
    found: (n: number) => `${n} image${n === 1 ? "" : "s"} found`,
    none: "No images found on that page.",
    all: "All", copyAll: "Copy all URLs", copied: "Copied!", open: "Open", copyUrl: "Copy URL",
    note: "Tip: some sites block proxy requests or load images via scripts PixelHarvest can't see. Try another page if a harvest comes back empty.",
    errTitle: "Couldn't harvest that page",
    errBody: "The page may block cross-origin proxies, require a login, or be temporarily unreachable. Try another URL.",
  },
  id: {
    eyebrow: "Scraper", title: "Panen gambar dari halaman",
    sub: "Tempel URL publik mana pun. PixelHarvest mengambilnya, mengekstrak setiap gambar, dan menatanya di bawah.",
    placeholder: "contoh.com atau https://contoh.com/halaman",
    harvest: "Panen", harvesting: "Memanen…", sample: "Coba halaman contoh",
    emptyTitle: "Gambar akan muncul di sini",
    emptyBody: "Tempel URL di atas lalu tekan Panen — atau muat halaman contoh untuk melihatnya bekerja.",
    found: (n: number) => `${n} gambar ditemukan`,
    none: "Tidak ada gambar ditemukan di halaman itu.",
    all: "Semua", copyAll: "Salin semua URL", copied: "Tersalin!", open: "Buka", copyUrl: "Salin URL",
    note: "Tips: beberapa situs memblokir permintaan proxy atau memuat gambar lewat skrip yang tak terlihat PixelHarvest. Coba halaman lain jika hasilnya kosong.",
    errTitle: "Gagal memanen halaman itu",
    errBody: "Halaman mungkin memblokir proxy lintas-asal, butuh login, atau sedang tak terjangkau. Coba URL lain.",
  },
};

function ImageCard({ url, openLabel, copyLabel, copiedLabel }: { url: string; openLabel: string; copyLabel: string; copiedLabel: string }) {
  const [dim, setDim] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);
  const [copied, setCopied] = useState(false);
  const name = useMemo(() => {
    try {
      return decodeURIComponent(new URL(url).pathname.split("/").pop() || url);
    } catch {
      return url;
    }
  }, [url]);

  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#0b0b12]/70 overflow-hidden">
      <div className="relative aspect-square flex items-center justify-center bg-[#0a0a10] overflow-hidden">
        {!broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={name}
            loading="lazy"
            className="max-w-full max-h-full object-contain"
            onLoad={(e) => setDim(`${e.currentTarget.naturalWidth}×${e.currentTarget.naturalHeight}`)}
            onError={() => setBroken(true)}
          />
        ) : (
          <i className="bi bi-image-alt text-zinc-700 text-2xl" />
        )}
        {dim && (
          <span className="absolute bottom-1.5 left-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-zinc-300">{dim}</span>
        )}

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={openLabel}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <i className="bi bi-box-arrow-up-right text-sm" />
          </a>
          <button
            title={copied ? copiedLabel : copyLabel}
            onClick={() => navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); })}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <i className={`bi ${copied ? "bi-check-lg text-green-400" : "bi-clipboard"} text-sm`} />
          </button>
        </div>
      </div>
      <div className="px-2.5 py-2">
        <p className="text-[11px] text-zinc-500 truncate" title={name}>{name}</p>
      </div>
    </div>
  );
}

export default function PixelHarvestScraper() {
  const [lang] = useLang();
  const t = T[lang];
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [copiedAll, setCopiedAll] = useState(false);

  const run = async (target: string) => {
    const clean = normalizeUrl(target);
    if (!clean) return;
    setLoading(true);
    setError(false);
    setImages(null);
    setFilter("all");
    try {
      const res = await harvest(clean);
      setImages(res.images);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSample = () => { setUrl(SAMPLE_URL); run(SAMPLE_URL); };

  // Format filter pills, derived from the current results.
  const formats = useMemo(() => {
    if (!images) return [];
    const counts: Record<string, number> = {};
    for (const u of images) counts[extFromUrl(u)] = (counts[extFromUrl(u)] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [images]);

  const shown = useMemo(() => {
    if (!images) return [];
    return filter === "all" ? images : images.filter((u) => extFromUrl(u) === filter);
  }, [images, filter]);

  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-16">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-5"><Eyebrow brand={B}>{t.eyebrow}</Eyebrow></div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h1>
        <p className="text-zinc-500 max-w-xl mx-auto">{t.sub}</p>
      </div>

      {/* URL bar */}
      <form
        onSubmit={(e) => { e.preventDefault(); run(url); }}
        className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 mb-3"
      >
        <div className="relative flex-1">
          <i className="bi bi-link-45deg absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.placeholder}
            className="w-full rounded-xl border border-white/10 bg-[#0b0b12] pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r ${B.gradClasses} disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95`}
          style={{ boxShadow: `0 12px 28px -10px rgba(${B.accent},0.6)` }}
        >
          <i className={`bi ${loading ? "bi-arrow-repeat animate-spin" : "bi-download"}`} />
          {loading ? t.harvesting : t.harvest}
        </button>
      </form>
      <div className="text-center mb-10">
        <button onClick={handleSample} disabled={loading} className="text-xs text-zinc-500 hover:text-white transition-colors disabled:opacity-60">
          <i className="bi bi-magic mr-1.5" /> {t.sample}
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="saas-shimmer aspect-square rounded-xl" />)}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="max-w-md mx-auto rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto mb-4">
            <i className="bi bi-exclamation-triangle text-red-400 text-xl" />
          </div>
          <h3 className="font-semibold text-base mb-2">{t.errTitle}</h3>
          <p className="text-sm text-zinc-500">{t.errBody}</p>
        </div>
      )}

      {/* Empty initial state */}
      {!loading && !error && images === null && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b0b12]/40 p-12 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-5" style={{ background: `linear-gradient(135deg, rgba(${B.accent},0.18), rgba(${B.accent},0.06))`, border: `1px solid rgba(${B.accent},0.2)` }}>
            <i className={`bi ${B.icon} text-2xl`} style={{ color: `rgb(${B.accentText})` }} />
          </div>
          <h3 className="font-semibold text-lg mb-2">{t.emptyTitle}</h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto">{t.emptyBody}</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && images !== null && (
        images.length === 0 ? (
          <p className="text-center text-zinc-500 py-12">{t.none}</p>
        ) : (
          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-zinc-400 mr-1">
                  <i className="bi bi-check-circle-fill mr-1.5" style={{ color: `rgb(${B.accentText})` }} />
                  {t.found(images.length)}
                </span>
                <button
                  onClick={() => setFilter("all")}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-colors ${filter === "all" ? "text-white" : "border-white/10 text-zinc-500 hover:text-white"}`}
                  style={filter === "all" ? { borderColor: `rgba(${B.accent},0.5)`, background: `rgba(${B.accent},0.15)` } : undefined}
                >
                  {t.all} {images.length}
                </button>
                {formats.map(([ext, count]) => (
                  <button
                    key={ext}
                    onClick={() => setFilter(ext)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-colors uppercase ${filter === ext ? "text-white" : "border-white/10 text-zinc-500 hover:text-white"}`}
                    style={filter === ext ? { borderColor: `rgba(${B.accent},0.5)`, background: `rgba(${B.accent},0.15)` } : undefined}
                  >
                    {ext} {count}
                  </button>
                ))}
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(shown.join("\n")).then(() => { setCopiedAll(true); setTimeout(() => setCopiedAll(false), 1600); })}
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all hover:bg-white/5 self-start sm:self-auto"
                style={{ color: `rgb(${B.accentText})`, border: `1px solid rgba(${B.accent},0.3)` }}
              >
                <i className={`bi ${copiedAll ? "bi-check-lg" : "bi-clipboard-check"}`} /> {copiedAll ? t.copied : t.copyAll}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {shown.map((u) => (
                <ImageCard key={u} url={u} openLabel={t.open} copyLabel={t.copyUrl} copiedLabel={t.copied} />
              ))}
            </div>

            <p className="text-[11px] text-zinc-600 mt-6 text-center max-w-2xl mx-auto leading-relaxed">{t.note}</p>
          </div>
        )
      )}
    </section>
  );
}
