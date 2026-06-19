"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface GaugeRingProps {
  /** Valeur 0-100 ; remplissage de l'anneau. */
  value: number;
  size?: number;
  stroke?: number;
  /** Lance le remplissage ; piloté par la visibilité de la carte. */
  active?: boolean;
  children?: ReactNode;
}

// Jauge circulaire SVG : l'anneau azur se remplit jusqu'à `value`% quand actif.
// Rejouable en remontant le composant via une `key`.
export default function GaugeRing({
  value,
  size = 84,
  stroke = 8,
  active = true,
  children,
}: GaugeRingProps) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(100, Math.max(0, value)) / 100);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-ciel-deep"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-azur"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: active ? offset : circ }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
