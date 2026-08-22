"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import SectionHeading from "./SectionHeading";

const STACK = [
  {
    category: "Languages",
    items: [
      { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", slug: "cplusplus" },
      { name: "Java", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
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
      { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "Raspberry Pi", slug: "raspberrypi" },
      { name: "Docker", slug: "docker" },
      { name: "Proxmox", slug: "proxmox" },
    ],
  },
];

/** Simple Icons CDN: no color = official brand color. Hover brightens via CSS. */
const ICON_BASE = "https://cdn.simpleicons.org";
const ULTRALYTICS_AVATAR = "https://avatars.githubusercontent.com/u/26833451?s=48";

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
    <section ref={sectionRef} id="tech-stack" className="mb-28 scroll-mt-24">
      <SectionHeading
        index="04 / TOOLKIT"
        title="Tech Stack"
        subtitle="The languages, frameworks, and infrastructure behind the projects above."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {STACK.map((group) => (
          <div key={group.category} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h3 className="kicker text-muted mb-5 flex items-center gap-2">
              <span className="inline-block h-px w-4 bg-accent" />
              {group.category}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
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
    </section>
  );
}
