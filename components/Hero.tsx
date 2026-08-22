"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconLinkedIn, IconGitHub, IconMail, IconDownload, IconArrowUpRight } from "./Icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ROLES = ["cryptography", "machine learning", "robotics", "full-stack"];
const EMAIL = "sharmasoham2007@gmail.com";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <header className="relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Ambient depth: a single warm glow + corner registration marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center"
      >
        {/* Left: identity */}
        <div>
          <motion.p variants={item} className="kicker text-accent mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" />
            Portfolio — Est. Dubai
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-text leading-[0.92] tracking-tight"
          >
            Soham
            <br />
            Sharma
          </motion.h1>

          <motion.p variants={item} className="mt-7 text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
            Computer Science student at{" "}
            <span className="text-text font-medium">HKUST</span>, building at the intersection of{" "}
            <span className="relative inline-block text-accent font-medium min-w-[9ch] font-mono text-base sm:text-lg align-baseline">
              {ROLES[roleIndex]}
              {!reduced && <span className="animate-blink text-accent">_</span>}
            </span>
            .
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              <IconDownload /> Download résumé
            </a>
            <Link
              href="#contact"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Get in touch <IconArrowUpRight />
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <a
              href="https://linkedin.com/in/ssharma25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-line text-text hover:text-accent hover:border-accent/50 cta-glow"
            >
              <IconLinkedIn size="lg" />
            </a>
            <a
              href="https://github.com/sharma2007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-line text-text hover:text-accent hover:border-accent/50 cta-glow"
            >
              <IconGitHub size="lg" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-line text-text hover:text-accent hover:border-accent/50 cta-glow"
            >
              <IconMail />
            </a>
          </motion.div>
        </div>

        {/* Right: avatar + dossier spec sheet */}
        <motion.div variants={item} className="relative mx-auto lg:mx-0 w-full max-w-sm">
          <div className="relative rounded-3xl border border-line bg-surface/60 backdrop-blur-sm p-5 shadow-card">
            <span aria-hidden className="absolute top-3 left-3 kicker text-muted/70">FIG. 01</span>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-line avatar-ring">
              <Image
                src="/images/user.avif"
                alt="Soham Sharma"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 384px, 420px"
              />
            </div>
            <dl className="mt-5 space-y-2.5 font-mono text-xs">
              <SpecRow label="STATUS" value="Open to internships" accent />
              <SpecRow label="BASED" value="Hong Kong / Dubai" />
              <SpecRow label="FOCUS" value="Software · AI · Systems" />
              <SpecRow label="AWARDS" value="Conrad Innovator" />
            </dl>
          </div>
        </motion.div>
      </motion.div>

      <Link
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors kicker z-10 flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </Link>
    </header>
  );
}

function SpecRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-2 last:border-0 last:pb-0">
      <dt className="text-muted tracking-widest">{label}</dt>
      <dd className={`text-right ${accent ? "text-accent" : "text-text"}`}>
        {accent && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />}
        {value}
      </dd>
    </div>
  );
}
