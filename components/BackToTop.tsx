"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link
            href="#top"
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accentDark transition-colors"
          >
            <i className="icon-arrow-up22 text-xl" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
