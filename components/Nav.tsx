"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "camps", label: "Camps" },
  { id: "certifications", label: "Certs" },
  { id: "languages", label: "Languages" },
  { id: "contact", label: "Contact" },
];

function MagneticCTA({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    setOffset({
      x: Math.max(-6, Math.min(6, deltaX * 12)),
      y: Math.max(-6, Math.min(6, deltaY * 12)),
    });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="#top"
            className="font-display font-semibold text-xl text-text hover:text-accent transition-colors duration-300"
          >
            Soham Sharma
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <div key={s.id} className="relative group">
                <Link
                  href={`#${s.id}`}
                  className={`relative block px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                    activeId === s.id
                      ? "text-accent bg-accentDim"
                      : "text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  {s.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-purple-400 transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              </div>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-2 p-2 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-all duration-300"
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
            {!user && (
              <MagneticCTA className="ml-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 rounded-lg text-sm font-medium bg-purple-600/80 text-white hover:bg-purple-500/90 transition-all duration-300"
                >
                  Log in
                </Link>
              </MagneticCTA>
            )}
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden p-2 text-text"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 overflow-hidden bg-bg/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6"
            onClick={() => setOpen(false)}
          >
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={`text-xl transition-colors duration-300 ${activeId === s.id ? "text-accent" : "text-text hover:text-accent"}`}
                onClick={() => setOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => { toggleTheme(); setOpen(false); }}
              className="text-xl text-text"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            {!user && (
              <Link href="/login" className="text-xl text-text hover:text-accent transition-colors" onClick={() => setOpen(false)}>
                Log in
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
