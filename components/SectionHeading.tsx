"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

/** Editorial section header: mono index + serif title + optional subtitle/action. */
export default function SectionHeading({ index, title, subtitle, action }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-index flex items-center gap-2 mb-3"
          >
            <span className="inline-block h-px w-6 bg-accent" />
            {index}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-4xl sm:text-5xl text-text tracking-tight"
          >
            {title}
          </motion.h2>
        </div>
        {action}
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted text-lg mt-4 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
