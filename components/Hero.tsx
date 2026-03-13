"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconLinkedIn, IconGitHub } from "./Icons";

const ROLES = ["CS Student.", "Conrad Innovator.", "Builder.", "Problem Solver."];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < full.length) {
            setDisplayText(full.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % ROLES.length);
          }
        }
      },
      isDeleting ? 50 : 120
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-bg">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden mb-8 border-4 border-accent/50 avatar-ring"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/user.avif"
              alt="Soham Sharma"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 176px, 208px"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-text mb-4 tracking-tight"
        >
          Soham Sharma
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-lg sm:text-xl text-accent mb-2 min-h-[2rem] font-mono"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="text-muted text-sm sm:text-base mb-10"
        >
          Techie / Animal Lover
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <a
            href="https://linkedin.com/in/ssharma25"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-white/10 text-text hover:text-accent hover:border-accent/50 cta-glow transition-all duration-300"
          >
            <IconLinkedIn size="lg" className="text-2xl" />
          </a>
          <a
            href="https://github.com/sharma2007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-white/10 text-text hover:text-accent hover:border-accent/50 cta-glow transition-all duration-300"
          >
            <IconGitHub size="lg" className="text-2xl" />
          </a>
        </motion.div>
      </motion.div>

      <Link
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors duration-300 text-sm z-10 flex flex-col items-center gap-2"
      >
        <span>Scroll down</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </Link>
    </header>
  );
}
