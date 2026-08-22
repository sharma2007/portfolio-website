"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconMail, IconCopy, IconCheck, IconLinkedIn, IconGitHub, IconArrowUpRight } from "./Icons";

const EMAIL = "sharmasoham2007@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-14 shadow-card"
      >
        <div aria-hidden className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full bg-accent/10 blur-[100px]" />
        <p className="kicker text-accent mb-5 flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-accent" />
          09 / CONTACT
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-6xl text-text tracking-tight max-w-2xl leading-[0.95]">
          Let&apos;s build something.
        </h2>
        <p className="text-muted text-lg mt-5 max-w-xl">
          Open to internships and collaborations. The fastest way to reach me is email — I usually reply within a day.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={`mailto:${EMAIL}`} className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
            <IconMail /> Email me
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold font-mono"
          >
            {copied ? <IconCheck className="text-accent" /> : <IconCopy />}
            {copied ? "Copied!" : EMAIL}
          </button>
        </div>

        <div className="mt-9 flex items-center gap-5 text-sm">
          <a href="https://linkedin.com/in/ssharma25" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors">
            <IconLinkedIn size="md" /> LinkedIn <IconArrowUpRight />
          </a>
          <a href="https://github.com/sharma2007" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors">
            <IconGitHub size="md" /> GitHub <IconArrowUpRight />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
