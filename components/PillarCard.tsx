"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  /** Rang dans la grille, pour la cascade d'apparition. */
  index?: number;
}

// Carte d'un pilier KYS — picto en ligne bleue, titre, description.
// Apparition en cascade légère au scroll (respecte prefers-reduced-motion).
export default function PillarCard({
  icon,
  title,
  description,
  index = 0,
}: PillarCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="rounded-3xl bg-ciel/60 p-6 ring-1 ring-inset ring-ciel-deep"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-azur shadow-sm ring-1 ring-inset ring-ciel-deep">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-bold text-marine">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-marine/70">
        {description}
      </p>
    </motion.article>
  );
}
