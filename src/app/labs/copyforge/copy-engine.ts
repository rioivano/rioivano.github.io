// CopyForge — bilingual copy generation engine (EN / ID).
//
// Fully deterministic, dependency-free, and runs entirely in the browser, so the
// demo works on a static GitHub Pages export with no backend or API key. Given a
// product brief, a tone, and a language, it assembles marketing copy from
// tone-specific word banks. A `seed` (incremented on every "Regenerate") rotates
// the picks so each run feels fresh while staying reproducible.

import type { Lang } from "@/constants/resumeData";

export type Tone = "professional" | "playful" | "bold" | "minimal";

export type CopyInput = {
  product: string;
  description: string; // an action phrase, e.g. "schedule social posts"
  audience: string;
  tone: Tone;
};

export type CopyResult = {
  headlines: string[];
  taglines: string[];
  adCopy: string;
  ctas: string[];
  meta: string;
};

type Bank = {
  adj: string[];
  adv: string[];
  platform: string[];
  pain: string[];
  gain: string[];
  gerund: string[];
  result: string[];
  promise: string[];
};

const BANKS_EN: Record<Tone, Bank> = {
  professional: {
    adj: ["streamlined", "reliable", "data-driven", "enterprise-ready", "polished"],
    adv: ["remarkably", "consistently", "measurably"],
    platform: ["platform", "workspace", "solution"],
    pain: ["manual work", "guesswork", "wasted hours"],
    gain: ["clarity", "momentum", "measurable results"],
    gerund: ["optimizing", "scaling", "shipping"],
    result: ["report", "draft", "campaign"],
    promise: ["Work smarter, not harder.", "Make every decision data-backed."],
  },
  playful: {
    adj: ["delightful", "ridiculously easy", "snappy", "friendly", "magical"],
    adv: ["seriously", "honestly", "surprisingly"],
    platform: ["sidekick", "little helper", "app"],
    pain: ["boring busywork", "blank-page panic", "copy-paste chaos"],
    gain: ["good vibes", "high-fives", "happy users"],
    gerund: ["creating", "playing", "building"],
    result: ["masterpiece", "draft", "idea"],
    promise: ["It's almost too fun.", "Your future self says thanks."],
  },
  bold: {
    adj: ["game-changing", "unstoppable", "next-level", "fearless"],
    adv: ["radically", "dramatically", "instantly"],
    platform: ["engine", "powerhouse", "command center"],
    pain: ["mediocrity", "slow workflows", "average results"],
    gain: ["velocity", "dominance", "an unfair advantage"],
    gerund: ["winning", "scaling", "crushing it"],
    result: ["win", "breakthrough", "launch"],
    promise: ["Built to win.", "Outwork nobody. Outsmart everybody."],
  },
  minimal: {
    adj: ["simple", "clean", "focused", "effortless"],
    adv: ["quietly", "calmly", "cleanly"],
    platform: ["tool", "space", "app"],
    pain: ["clutter", "noise", "friction"],
    gain: ["focus", "calm", "space to think"],
    gerund: ["creating", "writing", "building"],
    result: ["draft", "page", "note"],
    promise: ["Everything you need. Nothing you don't.", "Less, but better."],
  },
};

const BANKS_ID: Record<Tone, Bank> = {
  professional: {
    adj: ["efisien", "andal", "berbasis data", "siap-enterprise", "profesional"],
    adv: ["secara konsisten", "secara terukur", "dengan rapi"],
    platform: ["platform", "ruang kerja", "solusi"],
    pain: ["pekerjaan manual", "tebak-tebakan", "jam yang terbuang"],
    gain: ["kejelasan", "momentum", "hasil yang terukur"],
    gerund: ["mengoptimalkan", "menskalakan", "merilis"],
    result: ["laporan", "draf", "kampanye"],
    promise: ["Bekerja lebih cerdas, bukan lebih keras.", "Buat setiap keputusan berbasis data."],
  },
  playful: {
    adj: ["menyenangkan", "sangat mudah", "gesit", "ramah", "ajaib"],
    adv: ["sungguh", "jujur saja", "ternyata"],
    platform: ["sahabat", "asisten kecil", "aplikasi"],
    pain: ["pekerjaan membosankan", "panik halaman kosong", "kekacauan salin-tempel"],
    gain: ["vibe positif", "tepuk tangan", "pengguna bahagia"],
    gerund: ["berkreasi", "bermain", "membangun"],
    result: ["mahakarya", "draf", "ide"],
    promise: ["Hampir terlalu seru.", "Dirimu di masa depan berterima kasih."],
  },
  bold: {
    adj: ["mengubah permainan", "tak terbendung", "level berikutnya", "berani"],
    adv: ["secara radikal", "secara dramatis", "seketika"],
    platform: ["mesin", "kekuatan", "pusat komando"],
    pain: ["hasil biasa-biasa saja", "alur kerja lambat", "hasil rata-rata"],
    gain: ["kecepatan", "dominasi", "keunggulan tak tertandingi"],
    gerund: ["menang", "menskalakan", "menggebrak"],
    result: ["kemenangan", "terobosan", "peluncuran"],
    promise: ["Dibuat untuk menang.", "Kalahkan semua, ungguli siapa pun."],
  },
  minimal: {
    adj: ["sederhana", "bersih", "fokus", "ringan"],
    adv: ["dengan tenang", "dengan kalem", "dengan rapi"],
    platform: ["alat", "ruang", "aplikasi"],
    pain: ["kekacauan", "kebisingan", "hambatan"],
    gain: ["fokus", "ketenangan", "ruang berpikir"],
    gerund: ["berkreasi", "menulis", "membangun"],
    result: ["draf", "halaman", "catatan"],
    promise: ["Semua yang Anda butuh. Tanpa yang tidak.", "Lebih sedikit, tapi lebih baik."],
  },
};

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const pick = <T>(arr: T[], n: number): T => arr[((n % arr.length) + arr.length) % arr.length];

export function generateCopy(input: CopyInput, seed: number, lang: Lang): CopyResult {
  const fallback = lang === "en"
    ? { product: "Your Product", audience: "modern teams", desc: "get more done" }
    : { product: "Produk Anda", audience: "tim modern", desc: "menyelesaikan lebih banyak" };

  const product = input.product.trim() || fallback.product;
  const audience = (input.audience.trim() || fallback.audience).toLowerCase();
  const desc = (input.description.trim() || fallback.desc).toLowerCase().replace(/\.$/, "");
  const b = (lang === "en" ? BANKS_EN : BANKS_ID)[input.tone];

  const adj0 = pick(b.adj, seed);
  const adj1 = pick(b.adj, seed + 1);
  const adj2 = pick(b.adj, seed + 2);
  const adv = pick(b.adv, seed);
  const platform = pick(b.platform, seed);
  const pain = pick(b.pain, seed);
  const gain = pick(b.gain, seed);
  const gerund = pick(b.gerund, seed);
  const result = pick(b.result, seed);
  const promise = pick(b.promise, seed);

  if (lang === "en") {
    return {
      headlines: [
        `Finally — a ${adj0} way to ${desc}.`,
        `${product}: ${desc} without the ${pain}.`,
        `The ${platform} ${audience} trust to ${desc}.`,
      ],
      taglines: [
        `${cap(adj0)}. ${cap(adj1)}. Built for ${audience}.`,
        `${cap(desc)}, ${adv} ${adj2}.`,
        `Less ${pain}. More ${gain}.`,
      ],
      adCopy:
        `Meet ${product}, the ${adj0} ${platform} that helps ${audience} ${desc}. ` +
        `${promise} No ${pain}, no learning curve — just ${gain}. ` +
        `Join the ${audience} who move faster with ${product}.`,
      ctas: [`Start ${gerund} free`, `Try ${product} — no card needed`, `Get your first ${result} in minutes`],
      meta: `${product} helps ${audience} ${desc}. ${cap(adj0)}, ${adj1}, and built to save hours every week. Start free today.`,
    };
  }

  return {
    headlines: [
      `Akhirnya — cara ${adj0} untuk ${desc}.`,
      `${product}: ${desc} tanpa ${pain}.`,
      `${cap(platform)} yang dipercaya ${audience} untuk ${desc}.`,
    ],
    taglines: [
      `${cap(adj0)}. ${cap(adj1)}. Dibuat untuk ${audience}.`,
      `${cap(desc)}, ${adv} ${adj2}.`,
      `Lebih sedikit ${pain}. Lebih banyak ${gain}.`,
    ],
    adCopy:
      `Kenalkan ${product}, ${platform} ${adj0} yang membantu ${audience} ${desc}. ` +
      `${promise} Tanpa ${pain}, tanpa ribet — cukup ${gain}. ` +
      `Bergabunglah dengan ${audience} yang bergerak lebih cepat bersama ${product}.`,
    ctas: [`Mulai ${gerund} gratis`, `Coba ${product} — tanpa kartu`, `Dapatkan ${result} pertama dalam hitungan menit`],
    meta: `${product} membantu ${audience} ${desc}. ${cap(adj0)}, ${adj1}, dan dirancang menghemat waktu Anda. Mulai gratis hari ini.`,
  };
}

export const TONES: { value: Tone; label: { en: string; id: string }; icon: string }[] = [
  { value: "professional", label: { en: "Professional", id: "Profesional" }, icon: "bi-briefcase" },
  { value: "playful", label: { en: "Playful", id: "Ceria" }, icon: "bi-emoji-smile" },
  { value: "bold", label: { en: "Bold", id: "Berani" }, icon: "bi-lightning-charge" },
  { value: "minimal", label: { en: "Minimal", id: "Minimalis" }, icon: "bi-circle" },
];

// Pre-filled brief so visitors can see a result with one click.
export function getSample(lang: Lang): CopyInput {
  return lang === "en"
    ? { product: "Nimbus", description: "schedule social media posts", audience: "busy marketers", tone: "bold" }
    : { product: "Nimbus", description: "menjadwalkan postingan media sosial", audience: "marketer sibuk", tone: "bold" };
}
