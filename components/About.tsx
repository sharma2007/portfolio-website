"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { IconMail, IconLinkedIn, IconGitHub } from "./Icons";

const STATS = [
  { value: "200+", label: "students mentored" },
  { value: "$2,000+", label: "raised for non-profits" },
  { value: "#3", label: "National IOI Qualifier, UAE" },
  { value: "5+", label: "major engineering projects" },
];

const EMAIL = "sharmasoham2007@gmail.com";

export default function About() {
  return (
    <section id="about" className="mb-28 scroll-mt-24">
      <SectionHeading index="02 / PROFILE" title="About" />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <p className="text-xl sm:text-2xl leading-relaxed text-text font-display">
            A passion-driven freshman studying Computer Science at HKUST.
          </p>
          <p className="text-lg leading-relaxed text-muted mt-5">
            I won regionals and finished runner-up at FLL UAE by building a YOLOv8 model to detect
            Leading Edge Erosion, and prototyped concert armbands tracking health vitals and location.
            As a Conrad Innovator, I built software to encrypt data through a homomorphic, lattice-based
            encryptor. Currently building <span className="text-text">OurThing</span> — an app to find and
            announce free goodie events university-wide.
          </p>

          <div className="flex gap-3 mt-8">
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-line text-text hover:text-accent hover:border-accent/50 cta-glow"><IconMail /></a>
            <a href="https://linkedin.com/in/ssharma25" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-line text-text hover:text-accent hover:border-accent/50 cta-glow"><IconLinkedIn size="lg" /></a>
            <a href="https://github.com/sharma2007" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-line text-text hover:text-accent hover:border-accent/50 cta-glow"><IconGitHub size="lg" /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 grid grid-cols-2 gap-px bg-line rounded-2xl overflow-hidden border border-line"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface p-6 flex flex-col justify-center">
              <span className="font-display font-bold text-3xl text-accent">{s.value}</span>
              <span className="text-muted text-sm mt-1.5 leading-snug">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
