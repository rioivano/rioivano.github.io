"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { RESUME_DATA } from "@/constants/resumeData";
import type { Lang } from "@/constants/resumeData";

// Particle config — defined outside component to avoid re-creation
// Fixed-positioned so they appear across the entire page
const PARTICLES = [
  { anim: "floatA", delay: "0s",   dur: "5.2s", top: "8%",  left: "11%", sz: 3 },
  { anim: "floatB", delay: "1.3s", dur: "7.1s", top: "22%", left: "6%",  sz: 2 },
  { anim: "floatC", delay: "2.6s", dur: "6.0s", top: "15%", left: "88%", sz: 2 },
  { anim: "floatA", delay: "0.7s", dur: "8.4s", top: "38%", left: "85%", sz: 3 },
  { anim: "floatB", delay: "3.2s", dur: "5.5s", top: "5%",  left: "47%", sz: 2 },
  { anim: "floatC", delay: "1.9s", dur: "9.0s", top: "55%", left: "52%", sz: 2 },
  { anim: "floatA", delay: "4.1s", dur: "6.3s", top: "48%", left: "2%",  sz: 3 },
  { anim: "floatB", delay: "2.4s", dur: "7.5s", top: "62%", left: "95%", sz: 2 },
  { anim: "floatC", delay: "0.4s", dur: "5.8s", top: "78%", left: "22%", sz: 2 },
  { anim: "floatA", delay: "3.7s", dur: "6.9s", top: "12%", left: "75%", sz: 3 },
  { anim: "floatB", delay: "0.9s", dur: "6.7s", top: "32%", left: "33%", sz: 2 },
  { anim: "floatC", delay: "2.1s", dur: "8.0s", top: "70%", left: "68%", sz: 3 },
  { anim: "floatA", delay: "4.5s", dur: "5.4s", top: "85%", left: "14%", sz: 2 },
  { anim: "floatB", delay: "1.6s", dur: "7.8s", top: "91%", left: "80%", sz: 2 },
  { anim: "floatC", delay: "3.4s", dur: "6.2s", top: "44%", left: "58%", sz: 3 },
  { anim: "floatA", delay: "0.3s", dur: "9.1s", top: "25%", left: "42%", sz: 2 },
  { anim: "floatB", delay: "5.0s", dur: "5.9s", top: "60%", left: "8%",  sz: 2 },
  { anim: "floatC", delay: "1.1s", dur: "7.3s", top: "18%", left: "62%", sz: 3 },
  { anim: "floatA", delay: "3.9s", dur: "6.6s", top: "73%", left: "38%", sz: 2 },
  { anim: "floatB", delay: "2.8s", dur: "8.8s", top: "96%", left: "55%", sz: 2 },
  { anim: "floatC", delay: "4.7s", dur: "5.7s", top: "82%", left: "91%", sz: 3 },
  { anim: "floatA", delay: "0.6s", dur: "7.9s", top: "52%", left: "25%", sz: 2 },
  { anim: "floatB", delay: "3.1s", dur: "6.4s", top: "35%", left: "72%", sz: 2 },
  { anim: "floatC", delay: "1.8s", dur: "8.5s", top: "67%", left: "48%", sz: 3 },
  { anim: "floatA", delay: "4.3s", dur: "5.6s", top: "89%", left: "31%", sz: 2 },
] as const;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [displayedRole, setDisplayedRole] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  // Helper: get text in current language
  const t = (text: { en: string; id: string }) => text[lang];

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const savedLang = localStorage.getItem("portfolio-lang") as Lang | null;
    if (savedTheme === "light") setIsDark(false);
    if (savedLang === "id") setLang("id");
  }, []);

  // Sync light-mode class on <html> and persist theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Persist language
  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
  }, [lang]);

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  // Typing effect — re-runs when language changes
  useEffect(() => {
    const role = RESUME_DATA.role[lang];
    let interval: ReturnType<typeof setInterval>;
    let i = 0;
    setDisplayedRole("");
    setTypingDone(false);
    const delay = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayedRole(role.slice(0, i));
        if (i >= role.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 40);
    }, 500);
    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [lang]);

  // Audio toggle
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Nav items — translated labels, stable hrefs
  const navItems = useMemo(() => [
    { label: lang === "en" ? "About"     : "Tentang",   href: "about" },
    { label: lang === "en" ? "Skills"    : "Keahlian",  href: "skills" },
    { label: lang === "en" ? "Education" : "Pendidikan", href: "education" },
    { label: lang === "en" ? "Experience": "Pengalaman", href: "experience" },
    { label: lang === "en" ? "Contact"   : "Kontak",    href: "contact" },
  ], [lang]);

  // Theme class map
  const th = useMemo(() => (isDark ? {
    main:             "bg-[#080808] text-white",
    nav:              "bg-[#080808]/90 border-[#1e1e1e]",
    navMobile:        "border-[#1e1e1e]",
    navLink:          "text-zinc-500 hover:text-white",
    navMobileLink:    "text-zinc-300 hover:text-white border-[#111]",
    hamburger:        "text-zinc-400 hover:text-white",
    logoHover:        "group-hover:text-blue-100",
    heroLabel:        "text-zinc-600",
    heroRole:         "text-zinc-500",
    aboutText:        "text-zinc-400",
    portfolioBtn:     "bg-transparent hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600",
    imgBorder:        "border-[#1e1e1e]",
    skillCard:        "bg-[#0a0a0a] hover:bg-[#0e0e0e] border-[#1e1e1e] hover:border-blue-500/30",
    skillCardGlow:    "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%)",
    skillTitle:       "text-zinc-300 group-hover:text-blue-400",
    skillItems:       "text-zinc-600",
    eduBorder:        "border-blue-900/40",
    expBorder:        "border-cyan-900/40",
    timelineText:     "text-white",
    expPeriodColor:   "rgba(6,182,212,0.4)",
    expDesc:          "text-zinc-600",
    contactCard:      "bg-[#0a0a0a] border-[#222]",
    contactTitle:     "text-white",
    contactSubtitle:  "text-zinc-600",
    contactItem:      "bg-[#080808] hover:bg-[#111] border-[#1e1e1e] hover:border-blue-500/30",
    contactGithub:    "bg-[#080808] hover:bg-[#111] border-[#1e1e1e] hover:border-zinc-700/50",
    contactLink:      "text-zinc-500 group-hover:text-zinc-200",
    footer:           "border-[#141414]",
    footerGradient:   "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 30%, rgba(125,211,252,0.3) 50%, rgba(59,130,246,0.2) 70%, transparent 100%)",
    footerText:       "",
    langBorder:       "border-[#1e1e1e]",
    langInactive:     "text-zinc-500 hover:text-zinc-300",
    navShadow:        "shadow-2xl shadow-black/40",
    panelBg:          "bg-[#0d0d0d] border-l border-[#1e1e1e]",
    panelHeader:      "border-b border-[#1e1e1e]",
    panelFooter:      "border-t border-[#1e1e1e]",
    panelLink:        "text-zinc-400 hover:text-white hover:bg-white/5",
    panelLinkArrow:   "text-blue-400",
    panelLabel:       "text-zinc-600",
  } : {
    main:             "bg-[#f0f4f8] text-[#0f172a]",
    nav:              "bg-white/95 border-slate-200",
    navMobile:        "border-slate-200",
    navLink:          "text-slate-500 hover:text-slate-900",
    navMobileLink:    "text-slate-600 hover:text-slate-900 border-slate-100",
    hamburger:        "text-slate-500 hover:text-slate-900",
    logoHover:        "group-hover:text-blue-600",
    heroLabel:        "text-slate-400",
    heroRole:         "text-slate-500",
    aboutText:        "text-slate-600",
    portfolioBtn:     "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400",
    imgBorder:        "border-slate-200",
    skillCard:        "bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-400/50",
    skillCardGlow:    "linear-gradient(135deg, rgba(59,130,246,0.03) 0%, transparent 60%)",
    skillTitle:       "text-slate-700 group-hover:text-blue-600",
    skillItems:       "text-slate-500",
    eduBorder:        "border-blue-300/60",
    expBorder:        "border-cyan-400/40",
    timelineText:     "text-slate-900",
    expPeriodColor:   "rgba(6,182,212,0.6)",
    expDesc:          "text-slate-500",
    contactCard:      "bg-white border-slate-200",
    contactTitle:     "text-slate-900",
    contactSubtitle:  "text-slate-500",
    contactItem:      "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-400/50",
    contactGithub:    "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300",
    contactLink:      "text-slate-500 group-hover:text-slate-900",
    footer:           "border-slate-200",
    footerGradient:   "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.1) 30%, rgba(125,211,252,0.15) 50%, rgba(59,130,246,0.1) 70%, transparent 100%)",
    footerText:       "",
    langBorder:       "border-slate-200",
    langInactive:     "text-slate-500 hover:text-slate-700",
    navShadow:        "shadow-xl shadow-slate-300/40",
    panelBg:          "bg-white border-l border-slate-200",
    panelHeader:      "border-b border-slate-200",
    panelFooter:      "border-t border-slate-200",
    panelLink:        "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
    panelLinkArrow:   "text-blue-500",
    panelLabel:       "text-slate-400",
  }), [isDark]);


  return (
    <main className={`${th.main} min-h-screen selection:bg-blue-500/20 relative`}>

      {/* ── GLOBAL FIXED BACKGROUND ──────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="page-grid absolute inset-0 opacity-100" />
        <div className="page-scan-beam" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 35% at 50% -2%, rgba(59,130,246,0.05) 0%, transparent 65%)" }}
        />
        {/* Floating micro-particles — visible across entire page */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              top: p.top, left: p.left,
              width: p.sz, height: p.sz,
              animation: `${p.anim} ${p.dur} ${p.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ── NAVIGATION (fixed floating) ──────────────────────── */}
      <div className="fixed top-3 sm:top-4 left-3 right-3 sm:left-5 sm:right-5 z-50">
        <nav className={`nav-blur backdrop-blur-xl border rounded-2xl max-w-6xl mx-auto ${th.nav} ${th.navShadow}`}>
          <div className="px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 select-none group flex-shrink-0">
              <span className={`font-mono text-sm font-bold ${isDark ? "text-blue-400/50" : "text-blue-500/60"}`}>//</span>
              <span className={`nav-logo-text ${th.logoHover} transition-colors duration-300`}>
                Rio Ivano
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-7">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  className={`${th.navLink} transition-colors duration-200 text-xs font-medium uppercase tracking-[0.15em]`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Controls: Language + Theme + Hamburger */}
            <div className="flex items-center gap-2.5">

              {/* Language Toggle */}
              <div className={`flex rounded-md overflow-hidden border text-[10px] font-bold tracking-wider ${th.langBorder}`}>
                {(["en", "id"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1.5 uppercase transition-colors duration-200 ${
                      lang === l ? "bg-blue-600 text-white" : th.langInactive
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Dark / Light Toggle Switch */}
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className={`relative flex items-center w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                  isDark
                    ? "bg-blue-600/25 border border-blue-500/30"
                    : "bg-amber-100 border border-amber-300"
                }`}
              >
                <span
                  className={`absolute flex items-center justify-center w-[18px] h-[18px] rounded-full shadow-sm transition-all duration-300 ${
                    isDark ? "left-[3px] bg-blue-500" : "left-[calc(100%-21px)] bg-amber-400"
                  }`}
                >
                  <i className={`bi text-[8px] text-white ${isDark ? "bi-moon-stars-fill" : "bi-sun-fill"}`} />
                </span>
              </button>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`md:hidden ${th.hamburger} transition-colors p-1 -mr-1`}
                aria-label="Open navigation menu"
              >
                <i className="bi bi-list text-xl" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* ── MOBILE SLIDE PANEL ───────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } ${isDark ? "bg-black/60 backdrop-blur-sm" : "bg-black/30 backdrop-blur-sm"}`}
        onClick={() => setIsMenuOpen(false)}
      />
      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-72 flex flex-col transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${th.panelBg}`}
      >
        {/* Panel header */}
        <div className={`flex items-center justify-between px-6 py-4 ${th.panelHeader}`}>
          <a href="#" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <span className={`font-mono text-sm font-bold ${isDark ? "text-blue-400/50" : "text-blue-500/60"}`}>//</span>
            <span className="nav-logo-text">Rio Ivano</span>
          </a>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`p-1.5 rounded-lg transition-colors ${th.hamburger}`}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg text-lg" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group ${th.panelLink}`}
            >
              <span>{item.label}</span>
              <i className={`bi bi-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ${th.panelLinkArrow}`} />
            </a>
          ))}
        </nav>

        {/* Panel footer — toggles */}
        <div className={`px-6 py-5 ${th.panelFooter}`}>
          <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${th.panelLabel}`}>
            {lang === "en" ? "Appearance" : "Tampilan"}
          </p>
          <div className="flex items-center justify-between">
            {/* Language */}
            <div className={`flex rounded-md overflow-hidden border text-[10px] font-bold tracking-wider ${th.langBorder}`}>
              {(["en", "id"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 uppercase transition-colors duration-200 ${
                    lang === l ? "bg-blue-600 text-white" : th.langInactive
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`relative flex items-center w-11 h-6 rounded-full transition-colors duration-300 ${
                isDark
                  ? "bg-blue-600/25 border border-blue-500/30"
                  : "bg-amber-100 border border-amber-300"
              }`}
            >
              <span
                className={`absolute flex items-center justify-center w-[18px] h-[18px] rounded-full shadow-sm transition-all duration-300 ${
                  isDark ? "left-[3px] bg-blue-500" : "left-[calc(100%-21px)] bg-amber-400"
                }`}
              >
                <i className={`bi text-[8px] text-white ${isDark ? "bi-moon-stars-fill" : "bi-sun-fill"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div className="h-[72px]" />

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <header
        className="relative text-center px-5 py-24 sm:py-32 min-h-[90vh] flex flex-col justify-center items-center w-full overflow-hidden"
        data-aos="fade-up"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-grid absolute inset-0 opacity-55" />
          <div
            className="ambient-glow absolute rounded-full"
            style={{
              width: "clamp(400px, 70vw, 720px)",
              height: "clamp(400px, 70vw, 720px)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "clamp(200px, 35vw, 420px)",
              height: "clamp(200px, 35vw, 420px)",
              top: "10%", right: "8%",
              background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
              animation: "ambientDrift 16s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "clamp(150px, 25vw, 280px)",
              height: "clamp(150px, 25vw, 280px)",
              bottom: "8%", left: "6%",
              background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
              animation: "ambientDrift 12s ease-in-out infinite",
            }}
          />
          <div className="scan-line" />
          <div className="hud-tl absolute w-8 h-8 sm:w-10 sm:h-10 top-6 left-6 sm:top-10 sm:left-10" />
          <div className="hud-tr absolute w-8 h-8 sm:w-10 sm:h-10 top-6 right-6 sm:top-10 sm:right-10" />
          <div className="hud-bl absolute w-8 h-8 sm:w-10 sm:h-10 bottom-6 left-6 sm:bottom-10 sm:left-10" />
          <div className="hud-br absolute w-8 h-8 sm:w-10 sm:h-10 bottom-6 right-6 sm:bottom-10 sm:right-10" />
          <div className="data-readout absolute top-7.5 left-18 sm:top-10.5 sm:left-21 hidden sm:block">SYS.ONLINE</div>
          <div className="data-readout absolute top-7.5 right-18 sm:top-10.5 sm:right-21 hidden sm:block text-right">v2026.03</div>
          <div className="data-readout absolute bottom-7.5 left-18 sm:bottom-10.5 sm:left-21 hidden sm:block">PORT.FOLIO</div>
          <div className="data-readout absolute bottom-7.5 right-18 sm:bottom-10.5 sm:right-21 hidden sm:block text-right">RIO.IVANO</div>
          <div
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 30%, rgba(59,130,246,0.14) 50%, rgba(59,130,246,0.08) 70%, transparent 100%)",
            }}
          />
        </div>

        <p className={`relative mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.45em] ${th.heroLabel}`}>
          Portfolio
        </p>
        <h1
          className="relative name-text font-extrabold mb-5 leading-none tracking-tight break-words w-full"
          style={{ fontSize: "clamp(2.2rem, 10vw, 6rem)" }}
        >
          {RESUME_DATA.name}
        </h1>
        <p className={`relative hero-role ${th.heroRole} max-w-lg font-medium tracking-[0.18em] uppercase min-h-[1.5em] font-mono`}>
          {displayedRole}
          {!typingDone && <span className="typewriter-cursor" />}
        </p>
        <div className="divider-pulse mt-14 w-px h-12 bg-linear-to-b from-blue-500/40 to-transparent mx-auto" />
      </header>

      {/* ── ABOUT SECTION ────────────────────────────────────── */}
      <section id="about" className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20" data-aos="fade-up">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -right-20 sm:-right-10 top-0 rounded-full opacity-40"
            style={{
              width: "clamp(160px, 25vw, 320px)",
              height: "clamp(160px, 25vw, 320px)",
              background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.12) 40%, rgba(59,130,246,0.2) 50%, rgba(59,130,246,0.12) 60%, transparent 100%)" }}
          />
        </div>

        <h2 className="section-heading">
          {lang === "en" ? "About Me" : "Tentang Saya"}
        </h2>
        <div className="flex flex-col-reverse md:flex-row gap-10 lg:gap-16 items-center">
          <div className="w-full md:w-2/3">
            <p className={`${th.aboutText} leading-relaxed sm:leading-loose text-base sm:text-[17px] text-justify`}>
              {t(RESUME_DATA.about)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/downloads/rioivano-cv-feb-2026-eng.pdf"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <i className="bi bi-download"></i> Resume
              </a>
              <a
                href="/downloads/rioivano-portfolio-2026.pdf"
                className={`inline-flex items-center gap-2.5 ${th.portfolioBtn} px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                <i className="bi bi-box-seam"></i> Portfolio
              </a>
            </div>
          </div>
          <div className="w-44 sm:w-52 md:w-1/3 flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl blur opacity-15 group-hover:opacity-40 transition duration-700" />
              <img
                src="/images/profile.jpg"
                alt="Rio Ivano"
                className={`relative rounded-2xl w-full h-auto object-cover border ${th.imgBorder}`}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ───────────────────────────────────── */}
      <section id="skills" className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-full opacity-30"
            style={{
              width: "clamp(120px, 20vw, 240px)",
              height: "clamp(240px, 40vw, 480px)",
              background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 40%, rgba(99,102,241,0.2) 50%, rgba(99,102,241,0.12) 60%, transparent 100%)" }}
          />
        </div>

        <h2 className="section-heading">
          {lang === "en" ? "Technical Skills" : "Keahlian Teknis"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESUME_DATA.skills.map((skill, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 60}
              className={`group relative ${th.skillCard} p-5 rounded-xl transition-all duration-300 cursor-default overflow-hidden`}
            >
              <div className="hud-sm-tl absolute w-4 h-4 top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="hud-sm-br absolute w-4 h-4 bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{ background: th.skillCardGlow }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className={`relative font-semibold text-sm mb-2 transition-colors duration-200 ${th.skillTitle}`}>
                {t(skill.title)}
              </h3>
              <p className={`relative text-xs leading-relaxed ${th.skillItems}`}>{skill.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION & EXPERIENCE ───────────────────────────── */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-12 lg:gap-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute right-1/3 top-1/2 -translate-y-1/2 rounded-full opacity-25"
            style={{
              width: "clamp(120px, 20vw, 240px)",
              height: "clamp(200px, 35vw, 400px)",
              background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.1) 40%, rgba(6,182,212,0.18) 50%, rgba(6,182,212,0.1) 60%, transparent 100%)" }}
          />
        </div>

        {/* Education */}
        <section id="education" className="relative">
          <h2 className="section-heading">
            {lang === "en" ? "Education" : "Pendidikan"}
          </h2>
          <div className="space-y-8">
            {RESUME_DATA.education.map((edu, index) => (
              <div
                key={index}
                className={`relative pl-6 border-l ${th.eduBorder}`}
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                <div className="timeline-dot-blue" />
                <h3 className={`font-bold text-sm sm:text-base leading-snug ${th.timelineText}`}>{edu.school}</h3>
                <p className="text-blue-400 text-xs mt-1">{t(edu.degree)}</p>
                <p className="data-readout mt-1" style={{ animationDelay: `${index * 0.5}s` }}>{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative">
          <h2 className="section-heading">
            {lang === "en" ? "Experience" : "Pengalaman"}
          </h2>
          <div className="space-y-8">
            {RESUME_DATA.experience.map((exp, index) => (
              <div
                key={index}
                className={`relative pl-6 border-l ${th.expBorder}`}
                data-aos="fade-left"
                data-aos-delay={index * 60}
              >
                <div className="timeline-dot-cyan" />
                <h3 className={`font-bold text-sm sm:text-base leading-snug ${th.timelineText}`}>{exp.company}</h3>
                <p className="text-cyan-400 text-xs mt-1">{exp.role}</p>
                <p className="data-readout mt-1 mb-2" style={{ color: th.expPeriodColor, animationDelay: `${index * 0.4}s` }}>{exp.period}</p>
                <p className={`text-xs leading-relaxed line-clamp-2 ${th.expDesc}`}>{t(exp.description)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── CONTACT SECTION ──────────────────────────────────── */}
      <section id="contact" className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20" data-aos="fade-up">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.12) 40%, rgba(59,130,246,0.22) 50%, rgba(59,130,246,0.12) 60%, transparent 100%)" }}
          />
        </div>

        <div className={`relative ${th.contactCard} rounded-2xl p-5 sm:p-8 md:p-12 overflow-hidden`}>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hud-tl absolute w-6 h-6 top-4 left-4" />
            <div className="hud-tr absolute w-6 h-6 top-4 right-4" />
            <div className="hud-bl absolute w-6 h-6 bottom-4 left-4" />
            <div className="hud-br absolute w-6 h-6 bottom-4 right-4" />
            <div
              className="absolute -top-16 -right-16 rounded-full opacity-30"
              style={{
                width: "clamp(160px, 25vw, 300px)",
                height: "clamp(160px, 25vw, 300px)",
                background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-12 -left-12 rounded-full opacity-20"
              style={{
                width: "clamp(100px, 15vw, 200px)",
                height: "clamp(100px, 15vw, 200px)",
                background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
              }}
            />
            <div className="scan-line" style={{ animationDuration: "6s", animationDelay: "2s" }} />
          </div>

          <h2 className={`relative text-2xl sm:text-3xl font-bold mb-2 ${th.contactTitle}`}>
            {lang === "en" ? "Let's Connect" : "Mari Terhubung"}
          </h2>
          <p className={`relative text-sm mb-8 max-w-lg leading-relaxed ${th.contactSubtitle}`}>
            {lang === "en"
              ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
              : "Saya selalu terbuka untuk mendiskusikan proyek baru, ide-ide kreatif, atau peluang untuk menjadi bagian dari visi Anda."}
          </p>
          <div className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <a
              href={`mailto:${RESUME_DATA.contact.email}`}
              className={`group flex items-center gap-3 ${th.contactItem} p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5`}
            >
              <i className="bi bi-envelope text-blue-400 text-lg flex-shrink-0" />
              <span className={`text-xs truncate transition-colors ${th.contactLink}`}>
                {RESUME_DATA.contact.email}
              </span>
            </a>
            <a
              href={RESUME_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 ${th.contactItem} p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5`}
            >
              <i className="bi bi-linkedin text-blue-400 text-lg flex-shrink-0" />
              <span className={`text-xs transition-colors ${th.contactLink}`}>
                LinkedIn Profile
              </span>
            </a>
            <a
              href={RESUME_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 ${th.contactGithub} p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 sm:col-span-2 md:col-span-1`}
            >
              <i className={`bi bi-github text-lg flex-shrink-0 ${isDark ? "text-zinc-400" : "text-slate-500"}`} />
              <span className={`text-xs transition-colors ${th.contactLink}`}>
                GitHub Profile
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className={`relative text-center py-10 border-t ${th.footer} overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: th.footerGradient }}
          />
        </div>
        <p className="data-readout text-[9px] sm:text-[10px] tracking-[0.25em] uppercase">
          &copy; {new Date().getFullYear()} {RESUME_DATA.name} —{" "}
          {lang === "en" ? "ALL SYSTEMS OPERATIONAL" : "SEMUA SISTEM BERJALAN"}
        </p>
      </footer>

      {/* ── FLOATING WHATSAPP ────────────────────────────────── */}
      <a
        href={`https://wa.me/${RESUME_DATA.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-green-500 hover:bg-green-400 p-3.5 sm:p-4 rounded-2xl shadow-2xl shadow-green-500/20 z-50 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <i className="bi bi-whatsapp text-2xl sm:text-3xl" />
      </a>

      {/* ── FLOATING CASSETTE PLAYER ─────────────────────────── */}
      <audio ref={audioRef} src="/audios/dreaming.mp3" loop preload="none" />
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 px-3.5 py-2.5 rounded-2xl shadow-2xl z-50 transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center gap-1 ${
          isPlaying
            ? isDark
              ? "bg-[#0a0a14] border border-blue-500/40 shadow-blue-500/15"
              : "bg-blue-50 border border-blue-300/60 shadow-blue-200/50"
            : isDark
              ? "bg-[#0f0f0f] border border-[#1e1e1e] shadow-black/40"
              : "bg-white border border-slate-200 shadow-slate-200/60"
        }`}
      >
        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-[0.07] bg-blue-500" />
        )}

        {/* Cassette housing */}
        <div className={`relative flex items-center justify-between w-[54px] h-[32px] rounded-[4px] border px-[6px] overflow-hidden ${
          isPlaying
            ? "border-blue-400/50"
            : isDark ? "border-white/15" : "border-slate-300/60"
        }`}>
          {/* Tape line at bottom */}
          <div className={`absolute bottom-[5px] inset-x-[18px] h-px rounded-full ${
            isPlaying ? "bg-blue-300/50" : isDark ? "bg-white/10" : "bg-slate-400/20"
          }`} />

          {/* Left reel */}
          <div className={`relative z-10 w-[16px] h-[16px] rounded-full border flex items-center justify-center flex-shrink-0 ${
            isPlaying
              ? "border-blue-300/70 cassette-spin"
              : isDark ? "border-white/25" : "border-slate-400/40"
          }`}>
            <div className={`absolute w-px h-[9px] ${isPlaying ? "bg-blue-300/60" : isDark ? "bg-white/20" : "bg-slate-400/30"}`} />
            <div className={`absolute w-[9px] h-px ${isPlaying ? "bg-blue-300/60" : isDark ? "bg-white/20" : "bg-slate-400/30"}`} />
            <div className={`w-[5px] h-[5px] rounded-full ${isPlaying ? "bg-blue-300/80" : isDark ? "bg-white/20" : "bg-slate-400/35"}`} />
          </div>

          {/* Right reel (spins opposite direction, offset) */}
          <div
            className={`relative z-10 w-[16px] h-[16px] rounded-full border flex items-center justify-center flex-shrink-0 ${
              isPlaying
                ? "border-blue-300/70 cassette-spin"
                : isDark ? "border-white/25" : "border-slate-400/40"
            }`}
            style={isPlaying ? { animationDelay: "-0.9s", animationDirection: "reverse" } : undefined}
          >
            <div className={`absolute w-px h-[9px] ${isPlaying ? "bg-blue-300/60" : isDark ? "bg-white/20" : "bg-slate-400/30"}`} />
            <div className={`absolute w-[9px] h-px ${isPlaying ? "bg-blue-300/60" : isDark ? "bg-white/20" : "bg-slate-400/30"}`} />
            <div className={`w-[5px] h-[5px] rounded-full ${isPlaying ? "bg-blue-300/80" : isDark ? "bg-white/20" : "bg-slate-400/35"}`} />
          </div>
        </div>

        {/* Status label */}
        <span className={`relative text-[7px] font-mono tracking-[0.2em] uppercase ${
          isPlaying
            ? "text-blue-400"
            : isDark ? "text-zinc-700" : "text-slate-400"
        }`}>
          {isPlaying
            ? (lang === "en" ? "PLAYING" : "PUTAR")
            : (lang === "en" ? "MUSIC" : "MUSIK")}
        </span>
      </button>
    </main>
  );
}
