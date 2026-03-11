"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-dark mb-10 tracking-tight">About Me</h2>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <dl className="space-y-4 text-base">
            <div>
              <dt className="font-semibold text-slate-700">Name</dt>
              <dd className="text-muted">Soham Sharma</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-700">Email</dt>
              <dd>
                <a href="mailto:sharmasoham2007@gmail.com" className="text-accent hover:underline">
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
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark text-white hover:bg-accent transition-colors"
            >
              <i className="icon-linkedin2" />
            </a>
            <a
              href="https://github.com/sharma2007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark text-white hover:bg-accent transition-colors"
            >
              <i className="icon-github2" />
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="text-lg leading-relaxed text-slate-700">
            I&apos;m a passion-driven freshman pursuing my degree in Computer Science at HKUST.
            I&apos;ve won the regionals and came runner up in FLL UAE by creating an AI model to
            detect Leading Edge Erosion using YOLOv8, and prototyped arm bands for
            concerts—tracking health vitals and location.             Conrad Innovator Awardee, worked on
            software to encrypt data through a homomorphic lattice-based encryptor.
            Working on OurThing—an app to find and announce free goodie events university wide.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
