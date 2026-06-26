"use client";

// Shared chrome for every demo SaaS under /labs: animated background, top
// navigation (with EN/ID toggle), and footer. Everything is driven by a Brand
// token, so each product gets its own identity from one codebase.
//
// Language is kept in localStorage under the same "portfolio-lang" key the main
// site uses, so the visitor's choice carries across portfolio ⇄ SaaS. A tiny
// custom event keeps the nav and the page in sync within a tab without context.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/constants/resumeData";
import type { Brand } from "./brands";

const LANG_KEY = "portfolio-lang";
const LANG_EVENT = "saas-lang-change";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const read = () => {
      const v = localStorage.getItem(LANG_KEY);
      if (v === "id" || v === "en") setLangState(v);
    };
    read();
    window.addEventListener(LANG_EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(LANG_EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const setLang = (l: Lang) => {
    localStorage.setItem(LANG_KEY, l);
    setLangState(l);
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  return [lang, setLang];
}

export function GradientText({ brand, children, className = "" }: { brand: Brand; children: ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{ backgroundImage: brand.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ brand, children }: { brand: Brand; children: ReactNode }) {
  const c = brand.accent;
  const t = brand.accentText;
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em]"
      style={{ border: `1px solid rgba(${c},0.3)`, background: `rgba(${c},0.1)`, color: `rgb(${t})` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: `rgb(${t})` }} />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: `rgb(${t})` }} />
      </span>
      {children}
    </span>
  );
}

const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

function Logo({ brand, onClick }: { brand: Brand; onClick?: () => void }) {
  return (
    <Link href={brand.base} onClick={onClick} className="flex items-center gap-2.5 select-none flex-shrink-0">
      <span className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${brand.gradClasses} shadow-lg`} style={{ boxShadow: `0 8px 24px -8px rgba(${brand.accent},0.6)` }}>
        <i className={`bi ${brand.icon} text-white text-sm`} />
      </span>
      <span className="font-bold tracking-tight text-white text-[15px]">
        {brand.parts[0]}
        <GradientText brand={brand}>{brand.parts[1]}</GradientText>
      </span>
    </Link>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex rounded-md overflow-hidden border border-white/10 text-[10px] font-bold tracking-wider">
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1.5 uppercase transition-colors duration-200 ${
            lang === l ? "bg-white/15 text-white" : "text-zinc-500 hover:text-zinc-200"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Nav({ brand }: { brand: Brand }) {
  const pathname = norm(usePathname() || brand.base);
  const [lang, setLang] = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-3 sm:top-4 left-3 right-3 sm:left-5 sm:right-5 z-50">
      <nav className="nav-blur backdrop-blur-xl border border-white/10 rounded-2xl max-w-6xl mx-auto bg-[#0a0a12]/90 shadow-2xl shadow-black/40">
        <div className="px-5 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Logo brand={brand} />

          <div className="hidden md:flex items-center gap-7">
            {brand.nav.map((item) => {
              const active = pathname === norm(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${active ? "text-white" : "text-zinc-500 hover:text-white"}`}
                >
                  {item.label[lang]}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <LangToggle lang={lang} setLang={setLang} />
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <i className="bi bi-arrow-left text-xs" /> {lang === "en" ? "Portfolio" : "Portfolio"}
            </Link>
            {brand.launch && (
              <Link
                href={brand.launch.href}
                className={`hidden sm:inline-flex items-center gap-2 bg-gradient-to-r ${brand.gradClasses} text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95`}
                style={{ boxShadow: `0 8px 20px -8px rgba(${brand.accent},0.6)` }}
              >
                <i className="bi bi-stars text-[11px]" /> {brand.launch.label[lang]}
              </Link>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors p-1 -mr-1"
              aria-label="Toggle menu"
            >
              <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-xl`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
            {brand.nav.map((item) => {
              const active = pathname === norm(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "text-white bg-white/5" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                >
                  {item.label[lang]}
                </Link>
              );
            })}
            <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
              ← {lang === "en" ? "Back to portfolio" : "Kembali ke portfolio"}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

function Background({ brand }: { brand: Brand }) {
  const c = brand.accent;
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="page-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 110% 40% at 50% -5%, rgba(${c},0.10) 0%, transparent 60%)` }} />
      <div
        className="absolute rounded-full"
        style={{
          width: "clamp(280px, 45vw, 560px)", height: "clamp(280px, 45vw, 560px)",
          top: "-10%", right: "-8%",
          background: `radial-gradient(circle, rgba(${c},0.08) 0%, transparent 70%)`,
          animation: "ambientDrift 16s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "clamp(220px, 35vw, 440px)", height: "clamp(220px, 35vw, 440px)",
          bottom: "-6%", left: "-6%",
          background: `radial-gradient(circle, rgba(${c},0.07) 0%, transparent 70%)`,
          animation: "ambientDrift 13s ease-in-out infinite",
        }}
      />
      <div className="page-scan-beam" />
    </div>
  );
}

function Footer({ brand }: { brand: Brand }) {
  const [lang] = useLang();
  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className={`flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br ${brand.gradClasses}`}>
            <i className={`bi ${brand.icon} text-white text-xs`} />
          </span>
          <span className="text-sm text-zinc-400">
            {brand.parts[0]}<span className="text-white font-semibold">{brand.parts[1]}</span>
            {" — "}
            {lang === "en" ? "a demo product by" : "produk demo oleh"}{" "}
            <Link href="/" className="transition-colors hover:opacity-80" style={{ color: `rgb(${brand.accentText})` }}>Rio Ivano</Link>
          </span>
        </div>
        <p className="data-readout text-[9px] tracking-[0.25em] uppercase" style={{ color: `rgba(${brand.accentText},0.5)` }}>
          {lang === "en" ? "Concept demo · No real billing" : "Demo konsep · Tanpa tagihan nyata"}
        </p>
      </div>
    </footer>
  );
}

export function SaasShell({ brand, children }: { brand: Brand; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070708] text-white selection:bg-white/10 relative overflow-x-hidden">
      <Background brand={brand} />
      <Nav brand={brand} />
      <main className="relative z-10 pt-24 sm:pt-28">{children}</main>
      <Footer brand={brand} />
    </div>
  );
}
