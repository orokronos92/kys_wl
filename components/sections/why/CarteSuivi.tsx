"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyStats } from "@/lib/whyStats";
import TileShell from "@/components/why/TileShell";

const data = whyStats.suivi;

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Viz : calendrier avec le jour de la visite annuelle qui apparaît en pulsant,
// à côté/au-dessus du grand « 1/an ». Pas de pourcentage.
function Viz({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const cell = 18;
  const gap = 4;
  const startX = 12;
  const startY = 32;
  const days = Array.from({ length: 12 }, (_, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return {
      i,
      x: startX + col * (cell + gap),
      y: startY + row * (cell + gap),
      highlighted: col === 1 && row === 1,
    };
  });
  const hx = startX + 1 * (cell + gap) + cell / 2;
  const hy = startY + 1 * (cell + gap) + cell / 2;

  return (
    <div className="flex flex-col items-center">
      <svg width={68} height={68} viewBox="0 0 96 96" aria-hidden>
        <line x1={26} y1={6} x2={26} y2={18} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="text-azur-soft" />
        <line x1={62} y1={6} x2={62} y2={18} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="text-azur-soft" />
        <rect x={6} y={14} width={84} height={76} rx={10} fill="currentColor" className="text-ciel" />
        <rect x={6} y={14} width={84} height={76} rx={10} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-ciel-deep" />
        <path d="M6 24a8 8 0 0 1 8-8h68a8 8 0 0 1 8 8v2H6z" fill="currentColor" className="text-ciel-deep" />
        {days.map((d) => (
          <rect key={d.i} x={d.x} y={d.y} width={cell} height={cell} rx={4} fill="currentColor" className={d.highlighted ? "text-ciel" : "text-ciel-deep"} />
        ))}
        <motion.circle
          cx={hx}
          cy={hy}
          r={cell / 2 + 1}
          fill="currentColor"
          className="text-azur"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
          animate={active ? (reduce ? { opacity: 1 } : { opacity: 1, scale: [0, 1.18, 1] }) : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.3, ease: "easeOut", times: reduce ? undefined : [0, 0.6, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
      <span className="mt-1 text-xl font-extrabold leading-none text-marine">
        {data.valeurTexte}
      </span>
    </div>
  );
}

export default function CarteSuivi({ index = 0 }: { index?: number }) {
  return (
    <TileShell
      data={data}
      index={index}
      period={5000}
      phase={1200}
      icon={<CalendarIcon className="h-5 w-5" />}
      renderViz={(tick, active) => <Viz key={tick} active={active} />}
    />
  );
}
