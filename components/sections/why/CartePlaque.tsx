"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyStats } from "@/lib/whyStats";
import TileShell from "@/components/why/TileShell";
import CountUp from "@/components/why/CountUp";
import { ShieldIcon } from "@/components/icons/PillarIcons";

const data = whyStats.plaque;

// Demi-jauge SVG : un arc semi-circulaire se remplit en azur jusqu'au « niveau
// de plaque » (50 %), avec une aiguille marine qui pivote en parallèle.
function HalfGauge({ value, active }: { value: number; active: boolean }) {
  const reduce = useReducedMotion();
  const pct = Math.min(100, Math.max(0, value)) / 100;
  const size = 92;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const arcLen = Math.PI * r;
  const angle = -90 + pct * 180;

  return (
    <div className="relative" style={{ width: size, height: cy + stroke }}>
      <svg width={size} height={cy + stroke} className="overflow-visible">
        <path
          d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-ciel-deep"
        />
        <motion.path
          d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-azur"
          strokeDasharray={arcLen}
          initial={{ strokeDashoffset: arcLen }}
          animate={{ strokeDashoffset: active ? arcLen * (1 - pct) : arcLen }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.g
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
          initial={{ rotate: -90 }}
          animate={{ rotate: active ? angle : -90 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <line x1={cx} y1={cy} x2={cx} y2={stroke + 4} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className="text-marine" />
        </motion.g>
        <circle cx={cx} cy={cy} r={4.5} className="fill-marine" />
      </svg>
    </div>
  );
}

function Viz({ active }: { active: boolean }) {
  const v = data.valeur ?? 0;
  return (
    <div className="flex flex-col items-center">
      <HalfGauge value={v} active={active} />
      <CountUp
        to={v}
        suffix="%"
        active={active}
        className="-mt-1 text-xl font-extrabold text-marine"
      />
    </div>
  );
}

export default function CartePlaque({ index = 0 }: { index?: number }) {
  return (
    <TileShell
      data={data}
      index={index}
      period={5400}
      phase={1800}
      icon={<ShieldIcon className="h-5 w-5" />}
      renderViz={(tick, active) => <Viz key={tick} active={active} />}
    />
  );
}
