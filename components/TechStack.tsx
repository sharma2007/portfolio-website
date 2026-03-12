"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STACK = [
  {
    category: "Languages",
    items: [
      { name: "Python", slug: "python" },
      { name: "C++", slug: "cplusplus" },
      { name: "Java", slug: "openjdk" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
    ],
  },
  {
    category: "AI/ML",
    items: [
      { name: "YOLOv8", custom: "yolov8" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "scikit-learn", slug: "scikitlearn" },
      { name: "n8n", slug: "n8n" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "HTML/CSS", slug: "html5" },
    ],
  },
  {
    category: "Tools & Infra",
    items: [
      { name: "Git", slug: "git" },
      { name: "Linux", slug: "linux" },
      { name: "Raspberry Pi", slug: "raspberrypi" },
      { name: "Docker", slug: "docker" },
      { name: "Proxmox", slug: "proxmox" },
    ],
  },
  {
    category: "Cryptography",
    items: [{ name: "Homomorphic Encryption", custom: "lattice" }],
  },
];

const MUTED_HEX = "9ca3af";

function YOLOv8Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 3h4v4H3V3zm0 6h4v4H3V9zm0 6h4v4H3v-4zm6-12h4v4H9V3zm0 6h4v4H9V9zm0 6h4v4H9v-4zm6-12h4v4h-4V3zm0 6h4v4h-4V9zm0 6h4v4h-4v-4z" />
    </svg>
  );
}

function LatticeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83M18.36 18.36l-2.83-2.83M8.47 8.47L5.64 5.64" />
    </svg>
  );
}

function TechItem({
  name,
  slug,
  custom,
  index,
  inView,
}: {
  name: string;
  slug?: string;
  custom?: string;
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 transition-opacity duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionDelay: inView ? `${index * 60}ms` : "0ms",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.4s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <div className="tech-stack-icon flex h-12 w-12 items-center justify-center text-muted [transition:color_0.2s_ease] group-hover:text-accent">
        {custom === "yolov8" && <YOLOv8Icon className="h-8 w-8" />}
        {custom === "lattice" && <LatticeIcon className="h-8 w-8" />}
        {slug && (
          <img
            src={`https://cdn.simpleicons.org/${slug}/${MUTED_HEX}`}
            alt=""
            className="h-8 w-8 object-contain [transition:opacity_0.2s_ease] group-hover:opacity-100"
            style={{ opacity: 0.9 }}
          />
        )}
      </div>
      <span className="text-center text-sm text-muted transition-all duration-200 group-hover:text-text group-hover:underline group-hover:underline-offset-2">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: "-80px 0px -80px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let staggerIndex = 0;
  return (
    <motion.section
      ref={sectionRef}
      id="tech-stack"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-text mb-4 tracking-tight">
        Tech Stack
      </h2>
      <p className="text-muted text-lg mb-12">
        The toolkit behind the projects above.
      </p>

      <div className="space-y-12">
        {STACK.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-6">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="group flex flex-col items-center cursor-default"
                >
                  <TechItem
                    name={item.name}
                    slug={"slug" in item ? item.slug : undefined}
                    custom={"custom" in item ? item.custom : undefined}
                    index={staggerIndex++}
                    inView={inView}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
