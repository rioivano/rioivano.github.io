"use client";

import Link from "next/link";
import { Eyebrow, GradientText, useLang } from "../_shared/shell";
import { COPYFORGE as B } from "../_shared/brands";

const T = {
  en: {
    eyebrow: "AI-powered copywriting",
    h1a: "Forge scroll-stopping", h1b: "copy in", h1c: "seconds.",
    sub: "CopyForge turns a one-line brief into headlines, taglines, ad copy, and SEO metadata — tuned to your audience and voice. Stop staring at a blank page.",
    launch: "Launch the Studio", back: "Back to portfolio",
    mockLabel: "Generated headline",
    mockHeadline: "Finally — a game-changing way to schedule social posts.",
    mockTags: ["Bold. Fearless. Built for marketers.", "Schedule posts, radically simple.", "Less busywork. More velocity."],
    featTitle: "Everything you need to write less and ship more",
    featSub: "A focused toolkit that takes you from idea to publish-ready copy without the overhead.",
    howEyebrow: "How it works", howTitle: "Three steps to your next great line",
    ctaTitle: "Your next headline is one click away.",
    ctaSub: "Open the Studio and forge your first batch of copy — free, instant, right in your browser.",
    ctaBtn: "Try CopyForge free",
    features: [
      { icon: "bi-stars", title: "Headlines that convert", body: "Generate punchy, on-brand headlines tuned to your audience and tone — no blank-page paralysis." },
      { icon: "bi-sliders", title: "Four distinct voices", body: "Switch between Professional, Playful, Bold, and Minimal. Same brief, completely different energy." },
      { icon: "bi-arrow-repeat", title: "Endless variations", body: "Not feeling it? Regenerate instantly. Every pass gives you a fresh angle to work from." },
      { icon: "bi-clipboard-check", title: "Copy, paste, ship", body: "One-click copy on every line. Drop straight into your landing page, ad, or email." },
      { icon: "bi-search", title: "SEO-ready meta", body: "Each brief produces a tidy meta description, sized for search results out of the box." },
      { icon: "bi-translate", title: "Writes in two languages", body: "Generate polished copy in English or Indonesian — switch anytime, instantly." },
    ],
    steps: [
      { n: "01", title: "Describe your product", body: "Tell CopyForge what you're building, who it's for, and the vibe you want." },
      { n: "02", title: "Pick a tone", body: "Choose from four voices. CopyForge adapts every line to match it." },
      { n: "03", title: "Forge & refine", body: "Get headlines, taglines, ad copy, CTAs, and meta — then regenerate until it sings." },
    ],
  },
  id: {
    eyebrow: "Copywriting bertenaga AI",
    h1a: "Tempa copy yang", h1b: "memikat dalam", h1c: "hitungan detik.",
    sub: "CopyForge mengubah brief satu baris menjadi headline, tagline, ad copy, dan metadata SEO — disesuaikan dengan audiens dan gaya Anda. Berhenti menatap halaman kosong.",
    launch: "Buka Studio", back: "Kembali ke portfolio",
    mockLabel: "Headline dihasilkan",
    mockHeadline: "Akhirnya — cara mengubah permainan untuk menjadwalkan postingan.",
    mockTags: ["Berani. Tanpa takut. Untuk marketer.", "Jadwalkan postingan, sungguh sederhana.", "Lebih sedikit kerja repot. Lebih banyak kecepatan."],
    featTitle: "Semua yang Anda butuh untuk menulis lebih sedikit dan merilis lebih banyak",
    featSub: "Perangkat fokus yang membawa Anda dari ide ke copy siap publish tanpa repot.",
    howEyebrow: "Cara kerja", howTitle: "Tiga langkah menuju kalimat hebat berikutnya",
    ctaTitle: "Headline berikutnya hanya satu klik lagi.",
    ctaSub: "Buka Studio dan tempa batch copy pertama Anda — gratis, instan, langsung di browser.",
    ctaBtn: "Coba CopyForge gratis",
    features: [
      { icon: "bi-stars", title: "Headline yang mengkonversi", body: "Hasilkan headline yang nendang dan sesuai brand, selaras dengan audiens dan tone — tanpa kebuntuan halaman kosong." },
      { icon: "bi-sliders", title: "Empat suara berbeda", body: "Beralih antara Profesional, Ceria, Berani, dan Minimalis. Brief sama, energi benar-benar berbeda." },
      { icon: "bi-arrow-repeat", title: "Variasi tanpa batas", body: "Belum sreg? Hasilkan ulang seketika. Setiap putaran memberi sudut baru untuk diolah." },
      { icon: "bi-clipboard-check", title: "Salin, tempel, rilis", body: "Salin satu klik di setiap baris. Langsung pasang ke landing page, iklan, atau email Anda." },
      { icon: "bi-search", title: "Meta siap SEO", body: "Setiap brief menghasilkan meta description rapi, pas untuk hasil pencarian." },
      { icon: "bi-translate", title: "Menulis dalam dua bahasa", body: "Hasilkan copy yang halus dalam bahasa Inggris atau Indonesia — ganti kapan saja, seketika." },
    ],
    steps: [
      { n: "01", title: "Deskripsikan produk Anda", body: "Beri tahu CopyForge apa yang Anda bangun, untuk siapa, dan nuansa yang diinginkan." },
      { n: "02", title: "Pilih tone", body: "Pilih dari empat suara. CopyForge menyesuaikan setiap baris dengannya." },
      { n: "03", title: "Tempa & sempurnakan", body: "Dapatkan headline, tagline, ad copy, CTA, dan meta — lalu hasilkan ulang sampai pas." },
    ],
  },
};

export default function CopyForgeLanding() {
  const [lang] = useLang();
  const t = T[lang];
  const launchHref = B.launch?.href ?? B.base;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 text-center">
        <div className="flex justify-center mb-6">
          <Eyebrow brand={B}>{t.eyebrow}</Eyebrow>
        </div>
        <h1 className="font-extrabold tracking-tight leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}>
          {t.h1a}
          <br className="hidden sm:block" /> {t.h1b} <GradientText brand={B}>{t.h1c}</GradientText>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed mb-9">{t.sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={launchHref}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r ${B.gradClasses} text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95`}
            style={{ boxShadow: `0 12px 28px -10px rgba(${B.accent},0.6)` }}
          >
            <i className="bi bi-stars" /> {t.launch}
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-white/15 hover:border-white/30 text-zinc-200 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/5"
          >
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
              <span className="ml-2 text-[11px] font-mono text-zinc-600">copyforge/studio</span>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: `rgb(${B.accentText})` }}>{t.mockLabel}</p>
            <p className="text-xl sm:text-2xl font-bold text-white mb-5">{t.mockHeadline}</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {t.mockTags.map((tag) => (
                <div key={tag} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-zinc-300">{tag}</div>
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
            <div key={f.title} className="group relative rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-6 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden" style={{ ["--tw-border-opacity" as string]: 1 }}>
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
            <i className="bi bi-stars" /> {t.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
