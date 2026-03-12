"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STACK = [
  {
    category: "Languages",
    items: [
      { name: "Python", slug: "python" },
      { name: "C++", slug: "cplusplus" },
      { name: "Java", iconUrl: "https://www.svgrepo.com/svg/452234/java" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
    ],
  },
  {
    category: "AI/ML",
    items: [
      { name: "Ultralytics YOLOv8", custom: "yolov8" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "scikit-learn", slug: "scikitlearn" },
      { name: "n8n", slug: "n8n", color: "EA4B71" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs", color: "ffffff" },
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
];

/** Simple Icons CDN: no color = official brand color. Hover brightens via CSS. */
const ICON_BASE = "https://cdn.simpleicons.org";
const ULTRALYTICS_AVATAR = "https://avatars.githubusercontent.com/u/26833451?s=128";

function TechItem({
  name,
  slug,
  custom,
  iconUrl,
  color,
  index,
  inView,
}: {
  name: string;
  slug?: string;
  custom?: string;
  iconUrl?: string;
  color?: string;
  index: number;
  inView: boolean;
}) {
  const cdnSrc = slug ? (color ? `${ICON_BASE}/${slug}/${color}` : `${ICON_BASE}/${slug}`) : null;
  const imgSrc = iconUrl ?? (custom === "yolov8" ? ULTRALYTICS_AVATAR : cdnSrc);
  const isYolov8 = custom === "yolov8";

  return (
    <div
      className="flex flex-col items-center gap-1 transition-opacity duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionDelay: inView ? `${index * 60}ms` : "0ms",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.4s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <div className="tech-stack-icon flex h-9 w-9 flex-shrink-0 items-center justify-center">
        {imgSrc && (
          <img
            src={imgSrc}
            alt=""
            className={`h-6 w-6 object-contain transition-[filter,opacity] duration-200 group-hover:brightness-110 group-hover:saturate-150 ${isYolov8 ? "rounded-sm" : ""}`}
          />
        )}
      </div>
      <span className="text-center text-xs text-muted transition-all duration-200 group-hover:text-text group-hover:underline group-hover:underline-offset-2">
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
      <p className="text-muted text-lg mb-6">
        The toolkit behind the projects above.
      </p>

      <div className="space-y-6">
        {STACK.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="group flex flex-col items-center cursor-default"
                >
                  <TechItem
                    name={item.name}
                    slug={"slug" in item ? item.slug : undefined}
                    custom={"custom" in item ? item.custom : undefined}
                    iconUrl={"iconUrl" in item ? item.iconUrl : undefined}
                    color={"color" in item ? item.color : undefined}
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
