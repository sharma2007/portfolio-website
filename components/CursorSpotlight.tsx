"use client";

import { useMotionValue, useTransform, useSpring, motion } from "framer-motion";
import { useEffect } from "react";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { stiffness: 50, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const background = useTransform(
    [x, y],
    ([mx, my]: number[]) =>
      `radial-gradient(600px circle at ${mx}px ${my}px, rgba(139, 92, 246, 0.06), transparent 70%)`
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onLeave = () => {
      mouseX.set(-1000);
      mouseY.set(-1000);
    };
    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background }}
      aria-hidden
    />
  );
}
