"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { WhyStat } from "@/lib/whyStats";
import { useReplayWhileInView } from "./useReplay";

interface TileShellProps {
  data: WhyStat;
  icon: ReactNode;
  index: number;
  /** Période de relance (ms) — différente par carte pour désynchroniser. */
  period: number;
  /** Décalage initial (ms) pour désynchroniser le démarrage. */
  phase: number;
  renderViz: (tick: number, active: boolean) => ReactNode;
}

// Tuile compacte « Pourquoi agir tôt » : en-tête + viz animée + phrase-stat.
// Le détail (pourquoi + puces) se déplie au tap. Pas de ligne « Source ».
// Les animations se relancent en boucle tant que la tuile est visible.
export default function TileShell({
  data,
  icon,
  index,
  period,
  phase,
  renderViz,
}: TileShellProps) {
  const reduce = useReducedMotion();
  const { ref, tick, inView } = useReplayWhileInView(period, phase);
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : index * 0.07,
      }}
      className="flex flex-col rounded-2xl bg-white p-3.5 ring-1 ring-inset ring-ciel-deep"
    >
      <div className="flex items-start gap-2">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ciel text-azur ring-1 ring-inset ring-ciel-deep">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-tight text-marine">
            {data.titre}
          </h3>
          <p className="text-xs font-medium leading-tight text-azur">
            {data.soustitre}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col items-center justify-center text-center">
        {renderViz(tick, inView)}
        <p className="mt-2 text-xs leading-snug text-marine/70">
          {data.accroche}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-semibold text-azur"
      >
        {open ? "Masquer" : "Pourquoi agir tôt"}
        <span
          className={`transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden
        >
          ›
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-xs leading-relaxed text-marine/80">
              {data.pourquoi}
            </p>
            <ul className="mt-2 space-y-1.5">
              {data.points.map((pt) => (
                <li key={pt} className="flex gap-1.5 text-xs text-marine/80">
                  <span
                    className="mt-1 h-1 w-1 shrink-0 rounded-full bg-azur"
                    aria-hidden
                  />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
