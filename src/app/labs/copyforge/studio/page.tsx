"use client";

import { useState } from "react";
import { generateCopy, TONES, getSample, type CopyInput, type CopyResult, type Tone } from "../copy-engine";
import { Eyebrow, useLang } from "../../_shared/shell";
import { COPYFORGE as B } from "../../_shared/brands";

const T = {
  en: {
    eyebrow: "The Studio", title: "Forge your copy",
    sub: "Fill in a quick brief, pick a tone, and let CopyForge do the writing.",
    product: "Product or brand name", productPh: "e.g. Nimbus",
    what: "What does it do?", whatPh: "e.g. schedule social media posts",
    whatHint: "Phrase it as an action — “help teams ship faster”.",
    who: "Who is it for?", whoPh: "e.g. busy marketers",
    tone: "Tone of voice", forge: "Forge copy", forging: "Forging…",
    sample: "Or try a sample brief",
    emptyTitle: "Your copy will appear here",
    emptyBodyA: "Fill in the brief on the left and hit", emptyBodyB: "— or load a sample to see it in action.",
    forgedA: "Forged", forgedB: "copy for", regen: "Regenerate",
    headlines: "Headlines", taglines: "Taglines", adcopy: "Ad copy",
    ctas: "Call-to-action buttons", meta: "SEO meta description", chars: "characters",
  },
  id: {
    eyebrow: "Studio", title: "Tempa copy Anda",
    sub: "Isi brief singkat, pilih tone, dan biarkan CopyForge yang menulis.",
    product: "Nama produk atau brand", productPh: "mis. Nimbus",
    what: "Apa fungsinya?", whatPh: "mis. menjadwalkan postingan media sosial",
    whatHint: "Tulis sebagai aksi — “bantu tim merilis lebih cepat”.",
    who: "Untuk siapa?", whoPh: "mis. marketer sibuk",
    tone: "Tone suara", forge: "Tempa copy", forging: "Menempa…",
    sample: "Atau coba brief contoh",
    emptyTitle: "Copy Anda akan muncul di sini",
    emptyBodyA: "Isi brief di kiri lalu tekan", emptyBodyB: "— atau muat contoh untuk melihatnya bekerja.",
    forgedA: "Copy", forgedB: "untuk", regen: "Hasilkan ulang",
    headlines: "Headline", taglines: "Tagline", adcopy: "Ad copy",
    ctas: "Tombol ajakan (CTA)", meta: "Meta description SEO", chars: "karakter",
  },
};

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1400); })}
      aria-label="Copy to clipboard"
      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
    >
      <i className={`bi ${done ? "bi-check-lg text-green-400" : "bi-clipboard"} text-sm`} />
    </button>
  );
}

function ResultCard({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-5">
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: `rgb(${B.accentText})` }}>{label}</p>
      <div className="space-y-2.5">
        {items.map((t, i) => (
          <div key={i} className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="flex-1 text-sm text-zinc-200 leading-relaxed">{t}</p>
            <CopyButton text={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CopyForgeStudio() {
  const [lang] = useLang();
  const t = T[lang];
  const [input, setInput] = useState<CopyInput>({ product: "", description: "", audience: "", tone: "professional" });
  const [result, setResult] = useState<CopyResult | null>(null);
  const [seed, setSeed] = useState(0);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof CopyInput>(key: K, value: CopyInput[K]) => setInput((prev) => ({ ...prev, [key]: value }));

  // Brief "forging" delay so the result feels generated rather than instant.
  const forge = (nextSeed: number, brief: CopyInput) => {
    setLoading(true);
    setSeed(nextSeed);
    setTimeout(() => {
      setResult(generateCopy(brief, nextSeed, lang));
      setLoading(false);
    }, 650);
  };

  const handleGenerate = () => forge(seed + 1, input);
  const handleSample = () => { const s = getSample(lang); setInput(s); forge(seed + 1, s); };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-[#0b0b12] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors";

  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-16">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-5"><Eyebrow brand={B}>{t.eyebrow}</Eyebrow></div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h1>
        <p className="text-zinc-500 max-w-lg mx-auto">{t.sub}</p>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-6 items-start">
        {/* ── BRIEF FORM ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-[#0b0b12]/80 p-6 lg:sticky lg:top-28">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">{t.product}</label>
              <input className={inputCls} placeholder={t.productPh} value={input.product} onChange={(e) => set("product", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">{t.what}</label>
              <input className={inputCls} placeholder={t.whatPh} value={input.description} onChange={(e) => set("description", e.target.value)} />
              <p className="text-[11px] text-zinc-600 mt-1.5">{t.whatHint}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">{t.who}</label>
              <input className={inputCls} placeholder={t.whoPh} value={input.audience} onChange={(e) => set("audience", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2.5">{t.tone}</label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((tn) => {
                  const active = input.tone === tn.value;
                  return (
                    <button
                      key={tn.value}
                      onClick={() => set("tone", tn.value as Tone)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${active ? "text-white" : "border-white/10 text-zinc-400 hover:text-white hover:border-white/25"}`}
                      style={active ? { borderColor: `rgba(${B.accent},0.5)`, background: `rgba(${B.accent},0.15)` } : undefined}
                    >
                      <i className={`bi ${tn.icon} text-sm`} style={active ? { color: `rgb(${B.accentText})` } : undefined} />
                      {tn.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r ${B.gradClasses} disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95`}
              style={{ boxShadow: `0 12px 28px -10px rgba(${B.accent},0.6)` }}
            >
              <i className={`bi ${loading ? "bi-arrow-repeat animate-spin" : "bi-stars"}`} />
              {loading ? t.forging : t.forge}
            </button>
            <button onClick={handleSample} disabled={loading} className="w-full text-xs text-zinc-500 hover:text-white transition-colors disabled:opacity-60">
              <i className="bi bi-magic mr-1.5" /> {t.sample}
            </button>
          </div>
        </div>

        {/* ── RESULTS ────────────────────────────────────────── */}
        <div>
          {loading && (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-5">
                  <div className="saas-shimmer h-3 w-32 rounded mb-4" />
                  <div className="space-y-2.5">{[0, 1, 2].map((j) => <div key={j} className="saas-shimmer h-11 rounded-xl" />)}</div>
                </div>
              ))}
            </div>
          )}

          {!loading && !result && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b0b12]/40 p-12 text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-5" style={{ background: `linear-gradient(135deg, rgba(${B.accent},0.18), rgba(${B.accent},0.06))`, border: `1px solid rgba(${B.accent},0.2)` }}>
                <i className={`bi ${B.icon} text-2xl`} style={{ color: `rgb(${B.accentText})` }} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t.emptyTitle}</h3>
              <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                {t.emptyBodyA} <span style={{ color: `rgb(${B.accentText})` }}>{t.forge}</span> {t.emptyBodyB}
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm text-zinc-500">
                  {t.forgedA} <span className="text-zinc-300">{TONES.find((tn) => tn.value === input.tone)?.label[lang].toLowerCase()}</span> {t.forgedB}{" "}
                  <span className="text-white font-medium">{input.product.trim() || (lang === "en" ? "Your Product" : "Produk Anda")}</span>
                </p>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all hover:bg-white/5"
                  style={{ color: `rgb(${B.accentText})`, border: `1px solid rgba(${B.accent},0.3)` }}
                >
                  <i className="bi bi-arrow-repeat" /> {t.regen}
                </button>
              </div>

              <ResultCard label={t.headlines} items={result.headlines} />
              <ResultCard label={t.taglines} items={result.taglines} />

              <div className="rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: `rgb(${B.accentText})` }}>{t.adcopy}</p>
                <div className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <p className="flex-1 text-sm text-zinc-200 leading-relaxed">{result.adCopy}</p>
                  <CopyButton text={result.adCopy} />
                </div>
              </div>

              <ResultCard label={t.ctas} items={result.ctas} />

              <div className="rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: `rgb(${B.accentText})` }}>{t.meta}</p>
                <div className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <p className="flex-1 text-sm text-zinc-200 leading-relaxed">{result.meta}</p>
                  <CopyButton text={result.meta} />
                </div>
                <p className="text-[11px] text-zinc-600 mt-2.5">{result.meta.length} {t.chars}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
