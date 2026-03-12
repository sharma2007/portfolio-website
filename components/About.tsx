"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import SectionWrapper from "./SectionWrapper";

const STATS = [
  { value: 200, suffix: "+ students mentored" },
  { value: 2000, prefix: "$", suffix: "+ raised" },
  { value: 3, prefix: "UAE Rank #", suffix: "" },
  { value: 5, suffix: "+ Major Projects" },
];

function StatItem({
  value,
  prefix = "",
  suffix,
  isInView,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  isInView: boolean;
}) {
  const count = useCountUp(value, 2000, isInView);
  return (
    <span className="flex items-center gap-2">
      <span className="text-accent font-medium">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionWrapper id="about" className="mb-24 scroll-mt-24">
      <h2 ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-text mb-4 tracking-tight">
        About Me
      </h2>

      <div className="glass rounded-xl border-l-2 border-purple-500/50 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted mb-8">
          {STATS.map((stat, i) => (
            <span key={`${stat.value}-${stat.suffix}`} className="flex items-center gap-2">
              <StatItem
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isInView={isInView}
              />
              {i < STATS.length - 1 && <span className="text-white/20">·</span>}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 flex flex-col items-center md:items-start"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black shrink-0">
              <div className="absolute inset-0 animate-float">
                <Image
                  src="/images/user.avif"
                  alt="Soham Sharma"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
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
                className="flex h-10 w-10 items-center justify-center rounded-lg glass text-text hover:text-accent hover:border-purple-400/50 transition-all duration-300"
              >
                <i className="icon-linkedin2" />
              </a>
              <a
                href="https://github.com/sharma2007"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg glass text-text hover:text-accent hover:border-purple-400/50 transition-all duration-300"
              >
                <i className="icon-github2" />
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
      </div>
    </SectionWrapper>
  );
}
