"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const SKILLS = [
  { name: "Next.js", color: "#000" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind CSS", color: "#06b6d4" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776ab" },
  { name: "Framer Motion", color: "#bb4b96" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="skills" className="mb-24 scroll-mt-24">
      <h2 ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-text mb-4 tracking-tight">
        Tech Stack
      </h2>
      <p className="text-muted text-lg mb-10">Tools and technologies I work with.</p>

      <motion.div
        className="flex flex-wrap gap-3"
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-full glass px-4 py-2.5 flex items-center gap-2 hover:scale-110 hover:border-purple-400/50 hover:-translate-y-1 transition-all duration-200"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-sm font-medium text-text relative z-10">{skill.name}</span>
            <span
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)] group-hover:animate-shimmer"
              style={{ animationDuration: "1.5s" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
