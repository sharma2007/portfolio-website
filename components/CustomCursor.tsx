"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A trailing accent ring that augments — but never replaces — the native
 * cursor. Disabled on touch devices and when the user prefers reduced motion.
 */
export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch || reduced) return;

    let ringX = -100;
    let ringY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [role='button'], input, textarea, select"));
    };

    const animate = () => {
      ringX += (target.current.x - ringX) * 0.18;
      ringY += (target.current.y - ringY) * 0.18;
      setRing({ x: ringX, y: ringY });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced || !visible) return null;

  return (
    <div
      aria-hidden
      className="cursor-ring pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border"
      style={{
        left: ring.x,
        top: ring.y,
        width: active ? 44 : 28,
        height: active ? 44 : 28,
        borderColor: "var(--color-cursor-ring)",
        backgroundColor: active ? "var(--color-accent-dim)" : "transparent",
        mixBlendMode: "difference",
      }}
    />
  );
}
