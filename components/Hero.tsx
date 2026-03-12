"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const ROLES = ["CS Student.", "Conrad Innovator.", "Builder.", "Problem Solver."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const avatarX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const avatarY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <header
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
      }}
    >
      <div className="absolute inset-0 bg-bg">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={item} className="relative mb-6">
          <motion.div
            style={{ x: avatarX, y: avatarY }}
            className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-accent/50 avatar-ring ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black"
          >
            <div className="relative w-full h-full animate-float">
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
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-2 text-sm text-green-400 mb-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          Available for work
        </motion.div>

        <motion.h1
          variants={item}
          className="glow-text font-[var(--font-outfit)] text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4"
        >
          Soham Sharma
        </motion.h1>

        <motion.div variants={item} className="min-h-[2.5rem] flex items-center justify-center mb-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl text-accent font-mono"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p variants={item} className="text-muted text-sm sm:text-base mb-8">
          Techie / Animal Lover
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_0_24px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            View my work
            <i className="icon-arrow-right22" />
          </Link>
          <a
            href="https://linkedin.com/in/ssharma25"
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 px-6 py-3 rounded-xl text-text font-medium hover:border-purple-500/40 transition-all duration-200"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div variants={item} className="flex gap-4 mt-8">
          <a
            href="https://linkedin.com/in/ssharma25"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full glass text-text hover:text-accent hover:border-purple-400/50 transition-all duration-300"
          >
            <i className="icon-linkedin2 text-2xl" />
          </a>
          <a
            href="https://github.com/sharma2007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full glass text-text hover:text-accent hover:border-purple-400/50 transition-all duration-300"
          >
            <i className="icon-github2 text-2xl" />
          </a>
        </motion.div>
      </motion.div>

      <Link
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors duration-300 text-sm z-10 flex flex-col items-center gap-2"
      >
        <span>Scroll down</span>
        <span className="animate-bounce">↓</span>
      </Link>
    </header>
  );
}
