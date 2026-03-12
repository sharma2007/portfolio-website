"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const STACK = [
  {
    category: "Languages",
    items: [
      { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", slug: "cplusplus" },
      { name: "Java", custom: "java" },
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
      { name: "Next.js", slug: "nextdotjs", themeAdaptive: true },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "HTML/CSS", slug: "html5" },
    ],
  },
  {
    category: "Tools & Infra",
    items: [
      { name: "Git", slug: "git" },
      { name: "Linux", custom: "linux" },
      { name: "Raspberry Pi", slug: "raspberrypi" },
      { name: "Docker", slug: "docker" },
      { name: "Proxmox", slug: "proxmox" },
    ],
  },
];

/** Simple Icons CDN: no color = official brand color. Hover brightens via CSS. */
const ICON_BASE = "https://cdn.simpleicons.org";
const ULTRALYTICS_AVATAR = "https://avatars.githubusercontent.com/u/26833451?s=128";
const JAVA_ORANGE = "#f89820";
const LINUX_YELLOW = "#FCC624";

/** Inline Java coffee cup logo (#f89820) — no external request, always visible. */
function JavaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Cup: rounded rectangle body */}
      <path
        d="M5 7h10c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1z"
        fill={JAVA_ORANGE}
        stroke={JAVA_ORANGE}
        strokeWidth="0.5"
      />
      {/* Handle */}
      <path
        d="M15 8.5v3c0 .83-.67 1.5-1.5 1.5"
        stroke={JAVA_ORANGE}
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
      {/* Steam lines */}
      <path d="M7.5 5.5 Q8 5 8.5 5.5" stroke={JAVA_ORANGE} strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M12 4.5 Q12.5 4 13 4.5" stroke={JAVA_ORANGE} strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M16.5 5.5 Q17 5 17.5 5.5" stroke={JAVA_ORANGE} strokeWidth="0.9" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Inline Tux (Linux) — body #FCC624, rest dark. No external request. */
function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Body (official Linux yellow) */}
      <ellipse cx="12" cy="13" rx="6" ry="7" fill={LINUX_YELLOW} />
      {/* Belly highlight */}
      <ellipse cx="12" cy="15" rx="3" ry="3.5" fill="rgba(255,255,255,0.4)" />
      {/* Feet */}
      <ellipse cx="9" cy="19.5" rx="2" ry="1.2" fill="#333" />
      <ellipse cx="15" cy="19.5" rx="2" ry="1.2" fill="#333" />
      {/* Beak */}
      <path d="M16 11 L18 12 L16 13 Z" fill="#333" />
      {/* Eye */}
      <circle cx="14.5" cy="10.5" r="0.8" fill="#333" />
    </svg>
  );
}

function TechItem({
  name,
  slug,
  custom,
  iconUrl,
  color,
  themeAdaptive,
  index,
  inView,
}: {
  name: string;
  slug?: string;
  custom?: string;
  iconUrl?: string;
  color?: string;
  themeAdaptive?: boolean;
  index: number;
  inView: boolean;
}) {
  const { theme } = useTheme();
  const nextJsColor = theme === "light" ? "000000" : "ffffff";
  const effectiveColor = themeAdaptive && slug === "nextdotjs" ? nextJsColor : color;
  const cdnSrc = slug ? (effectiveColor ? `${ICON_BASE}/${slug}/${effectiveColor}` : `${ICON_BASE}/${slug}`) : null;
  const imgSrc = iconUrl ?? (custom === "yolov8" ? ULTRALYTICS_AVATAR : cdnSrc);
  const isYolov8 = custom === "yolov8";
  const isJava = custom === "java";
  const isLinux = custom === "linux";

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
        {isJava && (
          <JavaIcon className="h-6 w-6 transition-[filter,opacity] duration-200 group-hover:brightness-110 group-hover:saturate-150" />
        )}
        {isLinux && (
          <LinuxIcon className="h-6 w-6 transition-[filter,opacity] duration-200 group-hover:brightness-110 group-hover:saturate-150" />
        )}
        {!isJava && !isLinux && imgSrc && (
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
                    themeAdaptive={"themeAdaptive" in item ? item.themeAdaptive : undefined}
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
