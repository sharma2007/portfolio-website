"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-dark via-slate-800 to-slate-900 text-white overflow-hidden">
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
          className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl mb-8"
        >
          <Image
            src="/images/user.avif"
            alt="Soham Sharma"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 176px, 208px"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal mb-3"
        >
          Soham Sharma
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-lg sm:text-xl text-slate-300 mb-10"
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
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors"
          >
            <i className="icon-linkedin2 text-2xl" />
          </a>
          <a
            href="https://github.com/sharma2007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors"
          >
            <i className="icon-github2 text-2xl" />
          </a>
        </motion.div>
      </motion.div>
      <Link
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors text-sm z-10"
      >
        Scroll down
      </Link>
    </header>
  );
}
