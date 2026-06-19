"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { whyStats } from "@/lib/whyStats";
import CardShell from "@/components/why/CardShell";

const data = whyStats.suivi;

// Icône d'en-tête : petit calendrier simplifié (currentColor).
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 9.5h17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 3.5v3M16 3.5v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Viz : illustration calendrier (grille de jours) avec un jour mis en avant
// en azur qui apparaît puis pulse doucement au scroll. Pas de jauge ni de %.
function CalendarViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const cell = 18;
  const gap = 4;
  const startX = 12;
  const startY = 32;
  const cols = 4;
  const rows = 3;
  // Le jour mis en avant (ligne 1, colonne 1) figure la visite annuelle.
  const highlightCol = 1;
  const highlightRow = 1;

  const days = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      i,
      x: startX + col * (cell + gap),
      y: startY + row * (cell + gap),
      highlighted: col === highlightCol && row === highlightRow,
    };
  });

  const hx = startX + highlightCol * (cell + gap) + cell / 2;
  const hy = startY + highlightRow * (cell + gap) + cell / 2;

  return (
    <motion.div
      ref={ref}
      className="shrink-0"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width={96} height={96} viewBox="0 0 96 96" aria-hidden>
        {/* Reliure : deux anneaux en haut */}
        <line
          x1={26}
          y1={6}
          x2={26}
          y2={18}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-azur-soft"
        />
        <line
          x1={62}
          y1={6}
          x2={62}
          y2={18}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-azur-soft"
        />

        {/* Corps du calendrier */}
        <rect
          x={6}
          y={14}
          width={84}
          height={76}
          rx={10}
          fill="currentColor"
          className="text-ciel"
        />
        <rect
          x={6}
          y={14}
          width={84}
          height={76}
          rx={10}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="text-ciel-deep"
        />
        {/* Bandeau d'en-tête */}
        <path
          d="M6 24a8 8 0 0 1 8-8h68a8 8 0 0 1 8 8v2H6z"
          fill="currentColor"
          className="text-ciel-deep"
        />

        {/* Grille de jours */}
        {days.map((d) => (
          <rect
            key={d.i}
            x={d.x}
            y={d.y}
            width={cell}
            height={cell}
            rx={4}
            fill="currentColor"
            className={d.highlighted ? "text-ciel" : "text-ciel-deep"}
          />
        ))}

        {/* Jour mis en avant : pastille pleine azur qui pulse doucement */}
        <motion.circle
          cx={hx}
          cy={hy}
          r={cell / 2 + 1}
          fill="currentColor"
          className="text-azur"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
          animate={
            inView
              ? reduce
                ? { opacity: 1 }
                : { opacity: 1, scale: [0, 1.18, 1, 1.08, 1] }
              : undefined
          }
          transition={{
            duration: reduce ? 0 : 1.1,
            delay: reduce ? 0 : 0.35,
            ease: "easeOut",
            times: reduce ? undefined : [0, 0.45, 0.65, 0.85, 1],
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
    </motion.div>
  );
}

// Carte 2 — viz : illustration calendrier avec le jour de la visite annuelle
// mis en avant, à côté du grand « 1/an ». Pas de pourcentage.
export default function CarteSuivi({ index = 0 }: { index?: number }) {
  return (
    <CardShell index={index}>
      <header className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ciel text-azur ring-1 ring-inset ring-ciel-deep">
          <CalendarIcon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-bold leading-tight text-marine">{data.titre}</h3>
          <p className="text-sm font-medium text-azur">{data.soustitre}</p>
        </div>
      </header>

      <div className="mt-5 flex items-center gap-4">
        <CalendarViz />
        <div>
          <p className="text-3xl font-extrabold leading-none text-marine">
            {data.valeurTexte}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-marine/70">
            {data.accroche}
          </p>
        </div>
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
