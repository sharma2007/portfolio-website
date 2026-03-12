"use client";

import { useState, useEffect } from "react";

export function useCountUp(target: number, duration: number, isInView: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number;
    const step = (timestamp: number) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, isInView]);

  return count;
}
