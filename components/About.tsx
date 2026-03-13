"use client";

import { motion } from "framer-motion";
import { IconLinkedIn, IconGitHub } from "./Icons";

const STATS = [
  "200+ students mentored",
  "$2,000+ raised",
  "UAE Rank #3",
  "5+ Major Projects",
];

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-text mb-4 tracking-tight">
        About Me
      </h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 py-4 px-6 rounded-xl bg-surface border border-white/5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
      >
        {STATS.map((stat, i) => (
          <span key={stat} className="flex items-center gap-2">
            <span className="text-accent font-medium">{stat}</span>
            {i < STATS.length - 1 && <span className="text-white/20">·</span>}
          </span>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2"
        >
          <dl className="space-y-4 text-base">
            <div>
              <dt className="font-semibold text-text">Name</dt>
              <dd className="text-muted">Soham Sharma</dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Email</dt>
              <dd>
                <a
                  href="mailto:sharmasoham2007@gmail.com"
                  className="text-accent hover:underline transition-all duration-300"
                >
                  sharmasoham2007@gmail.com
                </a>
              </dd>
            </div>
          </dl>
          <div className="flex gap-3 mt-6">
            <a
              href="https://linkedin.com/in/ssharma25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-white/10 text-text hover:text-accent hover:border-accent/50 transition-all duration-300 cta-glow"
            >
              <IconLinkedIn size="lg" />
            </a>
            <a
              href="https://github.com/sharma2007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-white/10 text-text hover:text-accent hover:border-accent/50 transition-all duration-300 cta-glow"
            >
              <IconGitHub size="lg" />
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-3"
        >
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m a passion-driven freshman pursuing my degree in Computer Science at HKUST.
            I&apos;ve won the regionals and came runner up in FLL UAE by creating an AI model to
            detect Leading Edge Erosion using YOLOv8, and prototyped arm bands for
            concerts—tracking health vitals and location. Conrad Innovator Awardee, worked on
            software to encrypt data through a homomorphic lattice-based encryptor.
            Working on OurThing—an app to find and announce free goodie events university wide.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
