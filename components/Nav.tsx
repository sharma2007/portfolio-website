"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "camps", label: "Camps" },
  { id: "certifications", label: "Certs" },
  { id: "languages", label: "Languages" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="#top" className="font-serif text-xl text-white hover:text-accent transition-colors">
            Soham Sharma
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {s.label}
              </Link>
            ))}
            {!user && (
              <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                Log in
              </Link>
            )}
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden p-2 text-white"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block w-6 h-0.5 bg-white mb-1.5" />
            <span className="block w-6 h-0.5 bg-white mb-1.5" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-8"
            onClick={() => setOpen(false)}
          >
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-xl text-white hover:text-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            {!user && (
              <Link href="/login" className="text-xl text-white hover:text-accent transition-colors" onClick={() => setOpen(false)}>
                Log in
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
