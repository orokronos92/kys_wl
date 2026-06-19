"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyStats } from "@/lib/whyStats";
import TileShell from "@/components/why/TileShell";
import CountUp from "@/components/why/CountUp";

const data = whyStats.usure;

// Viz : dent (émail plus clair = érosion) + chiffre, et une barre qui se remplit
// jusqu'à la valeur (38 %). Pleine opacité.
function Viz({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const v = data.valeur ?? 0;
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 32 40" className="h-9 w-auto" fill="none" aria-hidden>
          <path
            d="M16 2C9 2 3 5 3 12c0 5 2 8 3 13 1 4 1 10 4 12 2 1 3-3 3-7s1-5 3-5 3 1 3 5 1 8 3 7c3-2 3-8 4-12 1-5 3-8 3-13C32 5 23 2 16 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="text-azur"
          />
          <path
            d="M16 2C9 2 3 5 3 12c0 1.6.3 3 .7 4.4 4-2.2 8-3.4 12.3-3.4s8.3 1.2 12.3 3.4c.4-1.4.7-2.8.7-4.4C29 5 23 2 16 2Z"
            fill="currentColor"
            className="text-azur-soft/40"
          />
        </svg>
        <CountUp
          to={v}
          suffix="%"
          active={active}
          className="text-lg font-extrabold leading-none text-marine"
        />
      </div>
      <div className="mt-2 h-2 w-16 overflow-hidden rounded-full bg-ciel-deep">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-azur to-azur-soft"
          initial={{ width: 0 }}
          animate={{ width: active ? `${v}%` : 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function CarteUsure({ index = 0 }: { index?: number }) {
  return (
    <TileShell
      data={data}
      index={index}
      period={4600}
      phase={600}
      icon={
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M12 3C8 3 5 4.6 5 8.2c0 2.7 1.1 4.3 1.7 7 .6 2.4.6 5.8 2.3 5.8 1.4 0 1.6-2.6 2-4.5.2-1.2.7-2 1-2s.8.8 1 2c.4 1.9.6 4.5 2 4.5 1.7 0 1.7-3.4 2.3-5.8.6-2.7 1.7-4.3 1.7-7C19 4.6 16 3 12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      }
      renderViz={(tick, active) => <Viz key={tick} active={active} />}
    />
  );
}
