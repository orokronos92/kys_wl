"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { whyStats } from "@/lib/whyStats";
import CardShell from "@/components/why/CardShell";
import CountUp from "@/components/why/CountUp";
import { ShieldIcon } from "@/components/icons/PillarIcons";

const data = whyStats.plaque;

// Demi-jauge SVG : un arc semi-circulaire (de gauche à droite) se remplit en azur
// jusqu'au « niveau de plaque » (50 %) à l'entrée dans le viewport, avec une aiguille
// qui pivote en parallèle. Respecte prefers-reduced-motion.
function HalfGauge({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const pct = Math.min(100, Math.max(0, value)) / 100;
  const size = 116;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  // Longueur de l'arc d'un demi-cercle.
  const arcLen = Math.PI * r;
  // Aiguille : de -90° (extrême gauche) à +90° (extrême droite).
  const angle = -90 + pct * 180;

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      style={{ width: size, height: cy + stroke }}
    >
      <svg width={size} height={cy + stroke} className="overflow-visible">
        {/* Arc de fond (demi-cercle ciel) */}
        <path
          d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-ciel-deep"
        />
        {/* Arc de progression azur */}
        <motion.path
          d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-azur"
          strokeDasharray={arcLen}
          initial={{ strokeDashoffset: arcLen }}
          animate={{ strokeDashoffset: inView ? arcLen * (1 - pct) : arcLen }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Aiguille pivotant depuis le centre de la base */}
        <motion.g
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
          initial={{ rotate: -90 }}
          animate={{ rotate: inView ? angle : -90 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={stroke + 4}
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            className="text-marine"
          />
        </motion.g>
        {/* Pivot central */}
        <circle cx={cx} cy={cy} r={4.5} className="fill-marine" />
      </svg>
    </div>
  );
}

// Carte 4 — viz : demi-jauge « niveau de plaque » qui monte jusqu'à 50 % + chiffre en count-up.
export default function CartePlaque({ index = 0 }: { index?: number }) {
  const valeur = data.valeur ?? 0;
  return (
    <CardShell index={index}>
      <header className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ciel text-azur ring-1 ring-inset ring-ciel-deep">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-bold leading-tight text-marine">{data.titre}</h3>
          <p className="text-sm font-medium text-azur">{data.soustitre}</p>
        </div>
      </header>

      <div className="mt-5 flex items-center gap-4">
        <div className="inline-flex flex-col items-center">
          <HalfGauge value={valeur} />
          <CountUp
            to={valeur}
            suffix="%"
            className="-mt-1 text-2xl font-extrabold text-marine"
          />
        </div>
        <p className="text-sm leading-relaxed text-marine/70">{data.accroche}</p>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-azur">
        Pourquoi agir tôt
      </p>
      <p className="mt-2 text-sm leading-relaxed text-marine/80">
        {data.pourquoi}
      </p>

      <ul className="mt-3 space-y-2">
        {data.points.map((pt) => (
          <li key={pt} className="flex gap-2 text-sm text-marine/80">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azur"
              aria-hidden
            />
            {pt}
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-4 text-xs text-marine/45">{data.source}</p>
    </CardShell>
  );
}
