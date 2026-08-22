"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { IconDownload } from "./Icons";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "resume", label: "Experience" },
  { id: "tech-stack", label: "Skills" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-line shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="#top"
            className="font-mono text-sm tracking-tight text-text hover:text-accent transition-colors flex items-center gap-2"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
            soham.sharma
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                data-active={activeId === s.id}
                className={`nav-link px-3 py-2 text-sm transition-colors ${
                  activeId === s.id ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                {s.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-2 p-2 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-text hover:border-accent hover:text-accent transition-colors"
            >
              <IconDownload /> Résumé
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-text"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block w-6 h-0.5 bg-current mb-1.5 transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current mb-1.5 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6"
            onClick={() => setOpen(false)}
          >
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={`font-display text-3xl transition-colors ${activeId === s.id ? "text-accent" : "text-text hover:text-accent"}`}
                onClick={() => setOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              <IconDownload /> Download résumé
            </a>
            <button
              type="button"
              onClick={() => { toggleTheme(); setOpen(false); }}
              className="kicker text-muted mt-2"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
