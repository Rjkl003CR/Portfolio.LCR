"use client";

import React, { useState } from 'react';
import { Mail, Code, Server, Database, Wrench, Menu, X, Globe } from 'lucide-react';

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="text-xl font-bold text-blue-400 tracking-wide">Chamathka.dev</a>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <button className="md:hidden text-slate-300" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-slate-800 px-6 py-4 space-y-3 flex flex-col">
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#skills" onClick={() => setNavOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a href="#projects" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-all">
          View Projects
        </a>
        <a href="https://github.com/Rjkl003CR" target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium px-6 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/chamathka-ranathunga-a825922aa" target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium px-6 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          LinkedIn
        </a>
      </div>


      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-950/50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 border-b border-slate-800 pb-4">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50">
              <Code className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Languages</h3>
              <p className="text-slate-400 text-sm">Java, JavaScript, C, C++, PHP, SQL[cite: 1]</p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50">
              <Server className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Frameworks</h3>
              <p className="text-slate-400 text-sm">Spring Boot, Next.js, React.js, Tailwind CSS[cite: 1]</p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50">
              <Database className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Databases & Cloud</h3>
              <p className="text-slate-400 text-sm">PostgreSQL, Vercel, MySQL[cite: 1]</p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50">
              <Wrench className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Tools & Agile</h3>
              <p className="text-slate-400 text-sm">Git, GitHub, Jira (Scrum), REST APIs[cite: 1]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 border-b border-slate-800 pb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Project 1 */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">FixZone</h3>
              <p className="text-blue-400 text-sm font-medium mb-4">Vehicle Service Management Platform[cite: 1]</p>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Multi-tenant platform digitalizing vehicle service operations[cite: 1]. Modeled domain workflows in Jira and developed Spring Boot REST APIs with RBAC and Next.js frontend modules[cite: 1].
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">Next.js[cite: 1]</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">Spring Boot[cite: 1]</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">PostgreSQL[cite: 1]</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">Jira[cite: 1]</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">LoRa 10</h3>
              <p className="text-blue-400 text-sm font-medium mb-4">Long-Range Hiker Safety System[cite: 1]</p>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Designed custom 2-layer PCB footprint and developed C++ OLED UI/UX firmware over FreeRTOS to support real-time BLE, LoRa emergency transmission, and GPS tracking[cite: 1].
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">ESP32[cite: 1]</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">LoRa[cite: 1]</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">FreeRTOS[cite: 1]</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">C++[cite: 1]</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-12 border-t border-slate-800 bg-slate-950 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          I am currently seeking Software Engineering and Business Analyst Internship opportunities.
        </p>
        <a href="mailto:rjklcr003@gmail.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-all mb-8">
          <Mail size={18} /> rjklcr003@gmail.com[cite: 1]
        </a>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Chamathka Ranathunga. All rights reserved.</p>
      </footer>
    </div>
  );
}