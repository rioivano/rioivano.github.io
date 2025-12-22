"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { RESUME_DATA } from "@/constants/resumeData"; 

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="bg-gray-900 text-white min-h-screen selection:bg-blue-500/30">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="text-blue-400 font-bold text-xl">Rio Ivano</div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['About', 'Skills', 'Education', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400 transition-colors uppercase tracking-wider">
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-6 space-y-4 bg-gray-900 border-b border-gray-800 animate-fade-in">
            {['About', 'Skills', 'Education', 'Experience', 'Contact'].map((item) => (
              <a key={item} 
                 href={`#${item.toLowerCase()}`} 
                 onClick={() => setIsMenuOpen(false)}
                 className="block text-gray-300 hover:text-blue-400 text-lg">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="text-center px-4 py-20 min-h-[70vh] flex flex-col justify-center items-center" data-aos="zoom-out">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          {RESUME_DATA.name}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light italic">
          {RESUME_DATA.role}
        </p>
      </header>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-blue-400 mb-8 border-l-4 border-blue-500 pl-4">About Me</h2>
        <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
          <div className="md:w-2/3">
            <p className="text-gray-300 leading-relaxed text-lg text-justify">{RESUME_DATA.about}</p>
            <div className="mt-10 flex flex-wrap gap-4">
               <a href="/downloads/cv.pdf" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
                  <i className="bi bi-download text-lg"></i> Download Resume
               </a>
               <a href="/downloads/portfolio.pdf" className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-orange-500/20">
                  <i className="bi bi-box-seam text-lg"></i> View Portfolio
               </a>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img src="/images/profile.jpg" alt="Rio Ivano" className="relative rounded-2xl w-full h-auto object-cover border border-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-blue-400 mb-8 border-l-4 border-blue-500 pl-4">Technical Knowledge</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_DATA.skills.map((skill, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100} 
                 className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group">
              <h3 className="font-bold text-blue-400 mb-3 group-hover:text-blue-300">{skill.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{skill.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & EXPERIENCE SECTION */}
      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-16">
        {/* Education */}
        <section id="education">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 border-l-4 border-blue-500 pl-4">Education</h2>
          <div className="space-y-8">
            {RESUME_DATA.education.map((edu, index) => (
              <div key={index} className="relative pl-6 border-l border-gray-700" data-aos="fade-left">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-2"></div>
                <h3 className="font-bold text-xl text-white">{edu.school}</h3>
                <p className="text-blue-400 text-sm">{edu.degree}</p>
                <p className="text-gray-500 text-xs mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 border-l-4 border-blue-500 pl-4">Experience</h2>
          <div className="space-y-8">
            {RESUME_DATA.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l border-gray-700" data-aos="fade-left">
                <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[6.5px] top-2"></div>
                <h3 className="font-bold text-xl text-white">{exp.company}</h3>
                <p className="text-cyan-400 text-sm">{exp.role}</p>
                <p className="text-gray-500 text-xs mt-1 mb-2">{exp.period}</p>
                <p className="text-gray-400 text-sm italic line-clamp-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CONTACT SECTION */}
      <section id="contact" className="max-w-5xl mx-auto px-4 py-20" data-aos="fade-up">
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Let's Connect</h2>
          <p className="text-gray-400 mb-8 max-w-xl">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <a href={`mailto:${RESUME_DATA.contact.email}`} className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition">
              <i className="bi bi-envelope-at text-blue-400 text-2xl"></i>
              <span className="text-sm truncate">{RESUME_DATA.contact.email}</span>
            </a>
            <a href={RESUME_DATA.contact.linkedin} target="_blank" className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition">
              <i className="bi bi-linkedin text-blue-400 text-2xl"></i>
              <span className="text-sm">LinkedIn Profile</span>
            </a>
            <a href={RESUME_DATA.contact.github} target="_blank" className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition">
              <i className="bi bi-github text-blue-400 text-2xl"></i>
              <span className="text-sm">GitHub Repo</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-600 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} {RESUME_DATA.name} | rioivano.github.io</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href={`https://wa.me/${RESUME_DATA.contact.whatsapp}`} 
         target="_blank"
         className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 p-4 rounded-2xl shadow-2xl z-50 transition-all hover:scale-110 hover:-rotate-3 active:scale-90">
        <i className="bi bi-whatsapp text-3xl"></i>
      </a>
    </main>
  );
}