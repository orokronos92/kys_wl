"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
  /** Démarre le décompte ; piloté par la visibilité de la carte. */
  active?: boolean;
}

// Compteur 0 → `to`. Démarre quand `active` passe à true. Pour rejouer,
// on remonte le composant via une `key` (cf. useReplayWhileInView).
export default function CountUp({
  to,
  durationMs = 1200,
  suffix = "",
  className,
  active = true,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
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
  }, [active, to, durationMs, reduce]);

  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}
