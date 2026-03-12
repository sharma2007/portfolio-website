"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const WORDS = "Get in touch".split(" ");

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="contact" className="mb-24 scroll-mt-24">
      <h2 ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-text mb-2 tracking-tight overflow-hidden">
        {WORDS.map((word, i) => (
          <motion.span
            key={word}
            initial={{ y: 60 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <p className="text-muted text-lg mb-10">Have a project in mind? Say hello.</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 border border-white/10 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] transition-shadow duration-300"
      >
        <form
          action="mailto:sharmasoham2007@gmail.com"
          method="get"
          encType="text/plain"
          className="space-y-5"
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1.5">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-text focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 focus:scale-[1.01] transition-transform outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1.5">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-text focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 focus:scale-[1.01] transition-transform outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              name="body"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-text focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 focus:scale-[1.01] transition-transform outline-none resize-none"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
          >
            Send message
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
          <motion.a
            href="https://github.com/sharma2007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-xl glass text-text hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.2)] transition-all duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="icon-github2 text-xl" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/ssharma25"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-xl glass text-text hover:shadow-[0_0_16px_rgba(0,119,181,0.4)] transition-all duration-300"
            style={{ color: "inherit" }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="icon-linkedin2 text-xl" />
          </motion.a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
