"use client";

import Link from "next/link";
import { Eyebrow, GradientText, useLang } from "../_shared/shell";
import { PIXELHARVEST as B } from "../_shared/brands";

const T = {
  en: {
    eyebrow: "Image scraping, in your browser",
    h1a: "Pull every image", h1b: "from any", h1c: "page.",
    sub: "Paste a URL and PixelHarvest fetches the page, finds every image — from <img> tags to lazy-loaded and social preview images — and lays them out in a clean, grab-ready gallery.",
    launch: "Open the Scraper", back: "Back to portfolio",
    mockBar: "pixelharvest/scraper", mockFound: "24 images found",
    featTitle: "A scraper that actually respects your time",
    featSub: "No extensions, no sign-up, no waiting. Point it at a page and harvest.",
    howEyebrow: "How it works", howTitle: "From URL to gallery in one click",
    ctaTitle: "Got a page full of images?", ctaSub: "Open the Scraper and harvest them all — free and instant.",
    ctaBtn: "Try PixelHarvest free",
    features: [
      { icon: "bi-search", title: "Finds what's hidden", body: "Reads <img>, srcset, lazy-load attributes, favicons, and og:image meta — not just the obvious ones." },
      { icon: "bi-grid-3x3-gap", title: "Clean visual gallery", body: "Every image as a live thumbnail with its real dimensions, so you see exactly what you're grabbing." },
      { icon: "bi-funnel", title: "Filter by format", body: "Jump straight to JPGs, PNGs, SVGs, WebP, or GIFs with one tap." },
      { icon: "bi-clipboard-check", title: "One-click URLs", body: "Copy any image URL, or copy them all at once as a tidy list." },
      { icon: "bi-shield-check", title: "Runs client-side", body: "Pages are fetched through a CORS proxy and parsed in your browser — nothing is stored." },
      { icon: "bi-lightning-charge", title: "Instant results", body: "Most pages harvest in a second or two. No queue, no account." },
    ],
    steps: [
      { n: "01", title: "Paste a URL", body: "Drop in any public web page — a blog post, a shop, a gallery." },
      { n: "02", title: "Harvest", body: "PixelHarvest fetches the page and extracts every image it can find." },
      { n: "03", title: "Filter & grab", body: "Filter by format, preview at real size, then copy the URLs you need." },
    ],
  },
  id: {
    eyebrow: "Scraping gambar, di browser Anda",
    h1a: "Ambil semua gambar", h1b: "dari halaman", h1c: "mana pun.",
    sub: "Tempel sebuah URL dan PixelHarvest mengambil halamannya, menemukan setiap gambar — dari tag <img> hingga gambar lazy-load dan preview media sosial — lalu menatanya dalam galeri yang rapi dan siap ambil.",
    launch: "Buka Scraper", back: "Kembali ke portfolio",
    mockBar: "pixelharvest/scraper", mockFound: "24 gambar ditemukan",
    featTitle: "Scraper yang benar-benar menghargai waktu Anda",
    featSub: "Tanpa ekstensi, tanpa daftar, tanpa menunggu. Arahkan ke halaman lalu panen.",
    howEyebrow: "Cara kerja", howTitle: "Dari URL ke galeri dalam satu klik",
    ctaTitle: "Punya halaman penuh gambar?", ctaSub: "Buka Scraper dan panen semuanya — gratis dan instan.",
    ctaBtn: "Coba PixelHarvest gratis",
    features: [
      { icon: "bi-search", title: "Menemukan yang tersembunyi", body: "Membaca <img>, srcset, atribut lazy-load, favicon, dan meta og:image — bukan hanya yang terlihat." },
      { icon: "bi-grid-3x3-gap", title: "Galeri visual yang rapi", body: "Setiap gambar sebagai thumbnail langsung dengan dimensi aslinya, jadi Anda tahu persis apa yang diambil." },
      { icon: "bi-funnel", title: "Filter per format", body: "Langsung ke JPG, PNG, SVG, WebP, atau GIF dengan satu ketukan." },
      { icon: "bi-clipboard-check", title: "URL satu klik", body: "Salin URL gambar mana pun, atau salin semuanya sekaligus sebagai daftar rapi." },
      { icon: "bi-shield-check", title: "Berjalan di sisi klien", body: "Halaman diambil melalui CORS proxy dan diurai di browser Anda — tidak ada yang disimpan." },
      { icon: "bi-lightning-charge", title: "Hasil instan", body: "Sebagian besar halaman dipanen dalam satu-dua detik. Tanpa antrean, tanpa akun." },
    ],
    steps: [
      { n: "01", title: "Tempel URL", body: "Masukkan halaman web publik apa pun — artikel blog, toko, galeri." },
      { n: "02", title: "Panen", body: "PixelHarvest mengambil halaman dan mengekstrak setiap gambar yang bisa ditemukan." },
      { n: "03", title: "Filter & ambil", body: "Filter per format, lihat pada ukuran asli, lalu salin URL yang Anda butuhkan." },
    ],
  },
};

export default function PixelHarvestLanding() {
  const [lang] = useLang();
  const t = T[lang];
  const launchHref = B.launch?.href ?? B.base;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 text-center">
        <div className="flex justify-center mb-6"><Eyebrow brand={B}>{t.eyebrow}</Eyebrow></div>
        <h1 className="font-extrabold tracking-tight leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}>
          {t.h1a}<br className="hidden sm:block" /> {t.h1b} <GradientText brand={B}>{t.h1c}</GradientText>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed mb-9">{t.sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={launchHref} className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r ${B.gradClasses} text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95`} style={{ boxShadow: `0 12px 28px -10px rgba(${B.accent},0.6)` }}>
            <i className="bi bi-download" /> {t.launch}
          </Link>
          <Link href="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-white/15 hover:border-white/30 text-zinc-200 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/5">
            <i className="bi bi-arrow-left text-sm" /> {t.back}
          </Link>
        </div>

        {/* Mock preview */}
        <div className="relative mt-16 max-w-3xl mx-auto">
          <div className="absolute -inset-1 rounded-3xl blur-2xl" style={{ background: `linear-gradient(90deg, rgba(${B.accent},0.2), rgba(${B.accent},0.12), rgba(${B.accent},0.2))` }} />
          <div className="relative rounded-2xl border border-white/10 bg-[#0b0b14]/90 backdrop-blur p-5 sm:p-7 text-left overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="hud-sm-tl absolute w-5 h-5 top-3 left-3" />
              <div className="hud-sm-br absolute w-5 h-5 bottom-3 right-3" />
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-[11px] font-mono text-zinc-600">{t.mockBar}</span>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: `rgb(${B.accentText})` }}>
              <i className="bi bi-check-circle-fill mr-1.5" /> {t.mockFound}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-md border border-white/10 flex items-center justify-center" style={{ background: `linear-gradient(135deg, rgba(${B.accent},${0.05 + (i % 3) * 0.05}), rgba(${B.accent},0.02))` }}>
                  <i className="bi bi-image text-zinc-600 text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.featTitle}</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">{t.featSub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.map((f) => (
            <div key={f.title} className="group relative rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-6 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, rgba(${B.accent},0.5), transparent)` }} />
              <div className="flex items-center justify-center w-11 h-11 rounded-xl mb-4" style={{ background: `linear-gradient(135deg, rgba(${B.accent},0.2), rgba(${B.accent},0.08))`, border: `1px solid rgba(${B.accent},0.2)` }}>
                <i className={`bi ${f.icon} text-lg`} style={{ color: `rgb(${B.accentText})` }} />
              </div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="text-center mb-12">
          <Eyebrow brand={B}>{t.howEyebrow}</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mt-5">{t.howTitle}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-7">
              <GradientText brand={B} className="font-mono font-bold text-3xl">{s.n}</GradientText>
              <h3 className="font-semibold text-lg mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="relative rounded-3xl p-10 sm:p-14 text-center overflow-hidden" style={{ border: `1px solid rgba(${B.accent},0.2)`, background: `linear-gradient(135deg, rgba(${B.accent},0.15), rgba(${B.accent},0.05))` }}>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hud-tl absolute w-7 h-7 top-4 left-4" />
            <div className="hud-br absolute w-7 h-7 bottom-4 right-4" />
          </div>
          <h2 className="relative text-2xl sm:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="relative text-zinc-400 max-w-lg mx-auto mb-8">{t.ctaSub}</p>
          <Link href={launchHref} className="relative inline-flex items-center gap-2.5 bg-white text-[#0b0b14] hover:bg-zinc-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <i className="bi bi-download" /> {t.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
