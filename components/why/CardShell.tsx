"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface CardShellProps {
  index?: number;
  children: ReactNode;
  className?: string;
}

// Cadre commun des cartes « Pourquoi agir tôt » : assure la cohérence visuelle
// (coins, anneau, ombre, apparition décalée au scroll). Le contenu interne varie d'une carte à l'autre.
export default function CardShell({
  index = 0,
  children,
  className,
}: CardShellProps) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : index * 0.08,
      }}
      className={`flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm shadow-marine/5 ring-1 ring-inset ring-ciel-deep transition-shadow hover:shadow-md hover:shadow-marine/10 sm:p-6 ${className ?? ""}`}
    >
      {children}
    </motion.article>
  );
}
