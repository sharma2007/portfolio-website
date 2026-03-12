"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    let ringX = -100;
    let ringY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos(posRef.current);
      setVisible(true);
    };

    const animate = () => {
      const { x, y } = posRef.current;
      ringX += (x - ringX) * 0.12;
      ringY += (y - ringY) * 0.12;
      setRing({ x: ringX, y: ringY });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (visible) document.body.classList.add("custom-cursor");
    else document.body.classList.remove("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="pointer-events-none fixed z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cursorRing"
        style={{ left: ring.x, top: ring.y }}
      />
    </>
  );
}
