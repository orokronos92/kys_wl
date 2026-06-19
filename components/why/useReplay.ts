"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Relance périodique d'animation TANT QUE l'élément est visible.
// `tick` s'incrémente toutes les `periodMs` (après un délai `phaseMs` pour
// désynchroniser les cartes) ; on s'en sert comme `key` pour rejouer la viz.
// En prefers-reduced-motion : pas de relance (tick reste à 0).
export function useReplayWhileInView(periodMs: number, phaseMs = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setTick((t) => t + 1);
      interval = setInterval(() => setTick((t) => t + 1), periodMs);
    }, phaseMs);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduce, periodMs, phaseMs]);

  return { ref, tick, inView };
}
