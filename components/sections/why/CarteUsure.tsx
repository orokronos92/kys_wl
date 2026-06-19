"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { whyStats } from "@/lib/whyStats";
import CardShell from "@/components/why/CardShell";
import CountUp from "@/components/why/CountUp";
import { ToothIcon } from "@/components/icons/PillarIcons";

const data = whyStats.usure;

// Carte 3 — viz : barre horizontale « émail qui s'use » qui se remplit jusqu'à
// la valeur (38 %) au scroll, accompagnée d'une dent SVG dont l'émail (partie
// haute) est plus clair pour évoquer l'érosion. Le chiffre est en count-up.
export default function CarteUsure({ index = 0 }: { index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const valeur = data.valeur ?? 0;

  return (
    <CardShell index={index}>
      <header className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ciel text-azur ring-1 ring-inset ring-ciel-deep">
          <ToothIcon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-bold leading-tight text-marine">{data.titre}</h3>
          <p className="text-sm font-medium text-azur">{data.soustitre}</p>
        </div>
      </header>

      <div ref={ref} className="mt-5">
        <div className="flex items-center gap-4">
          {/* Dent stylisée : émail (haut) plus clair pour suggérer l'usure. */}
          <motion.svg
            viewBox="0 0 32 40"
            className="h-12 w-auto shrink-0"
            fill="none"
            aria-hidden
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M16 2C9 2 3 5 3 12c0 5 2 8 3 13 1 4 1 10 4 12 2 1 3-3 3-7s1-5 3-5 3 1 3 5 1 8 3 7c3-2 3-8 4-12 1-5 3-8 3-13C32 5 23 2 16 2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              className="text-azur"
            />
            {/* Émail érodé : teinte plus claire sur la couronne. */}
            <path
              d="M16 2C9 2 3 5 3 12c0 1.6.3 3 .7 4.4 4-2.2 8-3.4 12.3-3.4s8.3 1.2 12.3 3.4c.4-1.4.7-2.8.7-4.4C29 5 23 2 16 2Z"
              fill="currentColor"
              className="text-azur-soft/30"
            />
          </motion.svg>

          <CountUp
            to={valeur}
            suffix="%"
            className="text-3xl font-extrabold leading-none text-marine sm:text-4xl"
          />
        </div>

        {/* Barre « émail qui s'use » : remplissage dégradé jusqu'à la valeur. */}
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-ciel-deep">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-azur to-azur-soft"
            initial={{ width: 0 }}
            animate={{ width: inView ? `${valeur}%` : 0 }}
            transition={{
              duration: reduce ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-marine/70">
          {data.accroche}
        </p>
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
