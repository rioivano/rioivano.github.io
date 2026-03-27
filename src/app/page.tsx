"use client";

import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { RESUME_DATA } from "@/constants/resumeData";

// Particle config — defined outside component to avoid re-creation
const PARTICLES = [
  { anim: "floatA", delay: "0s",   dur: "5.2s", top: "18%", left: "11%" },
  { anim: "floatB", delay: "1.3s", dur: "7.1s", top: "68%", left: "6%" },
  { anim: "floatC", delay: "2.6s", dur: "6.0s", top: "28%", left: "88%" },
  { anim: "floatA", delay: "0.7s", dur: "8.4s", top: "78%", left: "85%" },
  { anim: "floatB", delay: "3.2s", dur: "5.5s", top: "8%",  left: "47%" },
  { anim: "floatC", delay: "1.9s", dur: "9.0s", top: "88%", left: "52%" },
  { anim: "floatA", delay: "4.1s", dur: "6.3s", top: "50%", left: "2%" },
  { anim: "floatB", delay: "2.4s", dur: "7.5s", top: "42%", left: "95%" },
  { anim: "floatC", delay: "0.4s", dur: "5.8s", top: "93%", left: "22%" },
  { anim: "floatA", delay: "3.7s", dur: "6.9s", top: "5%",  left: "75%" },
] as const;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayedRole, setDisplayedRole] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const roleRef = useRef(RESUME_DATA.role);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    const role = roleRef.current;
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayedRole(role.slice(0, i));
        if (i >= role.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 40);
      return () => clearInterval(interval);
    }, 900);
    return () => clearTimeout(delay);
  }, []);

  return (
    // overflow-x-hidden removed from main — body already has it, and it breaks sticky nav
    <main className="bg-[#080808] text-white min-h-screen selection:bg-blue-500/20 relative">

      {/* ── GLOBAL FIXED BACKGROUND ──────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="page-grid absolute inset-0 opacity-100" />
        <div className="page-scan-beam" />
        {/* Top edge ambient glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 35% at 50% -2%, rgba(59,130,246,0.05) 0%, transparent 65%)" }}
        />
      </div>

      {/* ── NAVIGATION ───────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 nav-blur bg-[#080808]/90 backdrop-blur-xl border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">

          <a href="#" className="flex items-center gap-2 select-none group">
            <span className="text-blue-400/50 font-mono text-sm font-bold">//</span>
            <span className="nav-logo-text group-hover:text-blue-100 transition-colors duration-300">
              Rio Ivano
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {["About", "Skills", "Education", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs font-medium uppercase tracking-[0.15em]"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"} text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-5 pb-5 pt-2 space-y-1 border-b border-[#1e1e1e]">
            {["About", "Skills", "Education", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-zinc-300 hover:text-white py-2.5 text-sm tracking-wide transition-colors border-b border-[#111] last:border-0"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <header
        className="relative text-center px-5 py-24 sm:py-32 min-h-[90vh] flex flex-col justify-center items-center"
        data-aos="fade-up"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

          {/* Hero-local denser grid overlay */}
          <div className="hero-grid absolute inset-0 opacity-55" />

          {/* Ambient glow blobs */}
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

          {/* Scan beam */}
          <div className="scan-line" />

          {/* HUD corner brackets */}
          <div className="hud-tl absolute w-8 h-8 sm:w-10 sm:h-10 top-6 left-6 sm:top-10 sm:left-10" />
          <div className="hud-tr absolute w-8 h-8 sm:w-10 sm:h-10 top-6 right-6 sm:top-10 sm:right-10" />
          <div className="hud-bl absolute w-8 h-8 sm:w-10 sm:h-10 bottom-6 left-6 sm:bottom-10 sm:left-10" />
          <div className="hud-br absolute w-8 h-8 sm:w-10 sm:h-10 bottom-6 right-6 sm:bottom-10 sm:right-10" />

          {/* Data readout labels — hidden on mobile */}
          <div className="data-readout absolute top-7.5 left-18 sm:top-10.5 sm:left-21 hidden sm:block">SYS.ONLINE</div>
          <div className="data-readout absolute top-7.5 right-18 sm:top-10.5 sm:right-21 hidden sm:block text-right">v2026.03</div>
          <div className="data-readout absolute bottom-7.5 left-18 sm:bottom-10.5 sm:left-21 hidden sm:block">PORT.FOLIO</div>
          <div className="data-readout absolute bottom-7.5 right-18 sm:bottom-10.5 sm:right-21 hidden sm:block text-right">RIO.IVANO</div>

          {/* Floating micro-particles */}
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400"
              style={{
                top: p.top, left: p.left,
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                animation: `${p.anim} ${p.dur} ${p.delay} ease-in-out infinite`,
              }}
            />
          ))}

          {/* Horizon accent line */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 30%, rgba(59,130,246,0.14) 50%, rgba(59,130,246,0.08) 70%, transparent 100%)",
            }}
          />
        </div>

        {/* Hero content */}
        <p className="relative mb-4 text-[10px] sm:text-xs font-semibold text-zinc-600 uppercase tracking-[0.45em]">
          Portfolio
        </p>
        <h1 className="relative name-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-5 leading-none tracking-tight">
          {RESUME_DATA.name}
        </h1>
        <p className="relative text-zinc-500 text-xs sm:text-sm max-w-lg font-medium tracking-[0.18em] uppercase min-h-[1.5em] font-mono">
          {displayedRole}
          {!typingDone && <span className="typewriter-cursor" />}
        </p>

        <div className="divider-pulse mt-14 w-px h-12 bg-linear-to-b from-blue-500/40 to-transparent mx-auto" />
      </header>

      {/* ── ABOUT SECTION ────────────────────────────────────── */}
      <section id="about" className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20" data-aos="fade-up">
        {/* Section ornament */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -right-20 sm:-right-10 top-0 rounded-full opacity-40"
            style={{
              width: "clamp(160px, 25vw, 320px)",
              height: "clamp(160px, 25vw, 320px)",
              background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }}
          />
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.12) 40%, rgba(59,130,246,0.2) 50%, rgba(59,130,246,0.12) 60%, transparent 100%)" }}
          />
        </div>

        <h2 className="section-heading">About Me</h2>
        <div className="flex flex-col-reverse md:flex-row gap-10 lg:gap-16 items-center">

          <div className="w-full md:w-2/3">
            <p className="text-zinc-400 leading-relaxed sm:leading-loose text-base sm:text-[17px] text-justify">
              {RESUME_DATA.about}
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
                className="inline-flex items-center gap-2.5 bg-transparent hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
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
                className="relative rounded-2xl w-full h-auto object-cover border border-[#1e1e1e]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ───────────────────────────────────── */}
      <section id="skills" className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        {/* Section ornament */}
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

        <h2 className="section-heading">Technical Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESUME_DATA.skills.map((skill, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 60}
              className="group relative bg-[#0a0a0a] hover:bg-[#0e0e0e] border border-[#1e1e1e] hover:border-blue-500/30 p-5 rounded-xl transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Card corner HUD on hover */}
              <div className="hud-sm-tl absolute w-4 h-4 top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="hud-sm-br absolute w-4 h-4 bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Card glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%)" }}
              />
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="relative font-semibold text-sm text-zinc-300 mb-2 group-hover:text-blue-400 transition-colors duration-200">
                {skill.title}
              </h3>
              <p className="relative text-zinc-600 text-xs leading-relaxed">{skill.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION & EXPERIENCE ───────────────────────────── */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Section ornament */}
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
          <h2 className="section-heading">Education</h2>
          <div className="space-y-8">
            {RESUME_DATA.education.map((edu, index) => (
              <div
                key={index}
                className="relative pl-6 border-l border-blue-900/40"
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                <div className="timeline-dot-blue" />
                <h3 className="font-bold text-sm sm:text-base text-white leading-snug">{edu.school}</h3>
                <p className="text-blue-400 text-xs mt-1">{edu.degree}</p>
                <p className="data-readout mt-1" style={{ animationDelay: `${index * 0.5}s` }}>{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative">
          <h2 className="section-heading">Experience</h2>
          <div className="space-y-8">
            {RESUME_DATA.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-6 border-l border-cyan-900/40"
                data-aos="fade-left"
                data-aos-delay={index * 60}
              >
                <div className="timeline-dot-cyan" />
                <h3 className="font-bold text-sm sm:text-base text-white leading-snug">{exp.company}</h3>
                <p className="text-cyan-400 text-xs mt-1">{exp.role}</p>
                <p className="data-readout mt-1 mb-2" style={{ color: "rgba(6,182,212,0.4)", animationDelay: `${index * 0.4}s` }}>{exp.period}</p>
                <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── CONTACT SECTION ──────────────────────────────────── */}
      <section id="contact" className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20" data-aos="fade-up">
        {/* Section ornament */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.12) 40%, rgba(59,130,246,0.22) 50%, rgba(59,130,246,0.12) 60%, transparent 100%)" }}
          />
        </div>

        {/* Contact card with HUD framing */}
        <div className="relative bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 sm:p-10 md:p-12 overflow-hidden">
          {/* HUD corners inside card */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hud-tl absolute w-6 h-6 top-4 left-4" />
            <div className="hud-tr absolute w-6 h-6 top-4 right-4" />
            <div className="hud-bl absolute w-6 h-6 bottom-4 left-4" />
            <div className="hud-br absolute w-6 h-6 bottom-4 right-4" />
            {/* Ambient glow inside card */}
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
            {/* Scan line inside card */}
            <div className="scan-line" style={{ animationDuration: "6s", animationDelay: "2s" }} />
          </div>

          <h2 className="relative text-2xl sm:text-3xl font-bold text-white mb-2">Let&apos;s Connect</h2>
          <p className="relative text-zinc-600 text-sm mb-8 max-w-lg leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <a
              href={`mailto:${RESUME_DATA.contact.email}`}
              className="group flex items-center gap-3 bg-[#080808] hover:bg-[#111] border border-[#1e1e1e] hover:border-blue-500/30 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <i className="bi bi-envelope text-blue-400 text-lg flex-shrink-0" />
              <span className="text-zinc-500 group-hover:text-zinc-200 text-xs truncate transition-colors">
                {RESUME_DATA.contact.email}
              </span>
            </a>
            <a
              href={RESUME_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#080808] hover:bg-[#111] border border-[#1e1e1e] hover:border-blue-500/30 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <i className="bi bi-linkedin text-blue-400 text-lg flex-shrink-0" />
              <span className="text-zinc-500 group-hover:text-zinc-200 text-xs transition-colors">
                LinkedIn Profile
              </span>
            </a>
            <a
              href={RESUME_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#080808] hover:bg-[#111] border border-[#1e1e1e] hover:border-zinc-700/50 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 sm:col-span-2 md:col-span-1"
            >
              <i className="bi bi-github text-zinc-400 text-lg flex-shrink-0" />
              <span className="text-zinc-500 group-hover:text-zinc-200 text-xs transition-colors">
                GitHub Profile
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="relative text-center py-10 border-t border-[#141414] overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 30%, rgba(125,211,252,0.3) 50%, rgba(59,130,246,0.2) 70%, transparent 100%)" }}
          />
        </div>
        <p className="data-readout text-[9px] sm:text-[10px] tracking-[0.25em] uppercase">
          &copy; {new Date().getFullYear()} {RESUME_DATA.name} — ALL SYSTEMS OPERATIONAL
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
    </main>
  );
}
