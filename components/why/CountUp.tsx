"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
}

// Compteur qui s'incrémente de 0 à `to` lorsqu'il entre dans le viewport.
// Respecte prefers-reduced-motion (affiche directement la valeur finale).
export default function CountUp({
  to,
  durationMs = 1200,
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duree = reduce ? 0 : durationMs;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = duree === 0 ? 1 : Math.min(1, (now - start) / duree);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, durationMs, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
