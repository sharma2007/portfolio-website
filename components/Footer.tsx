"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative bg-surface py-12 text-center border-t border-transparent before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:w-full before:bg-[linear-gradient(to_right,transparent,rgba(139,92,246,0.3),transparent)]"
    >
      <p className="text-muted">© Soham Sharma</p>
    </motion.footer>
  );
}
