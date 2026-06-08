"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Décalage d'apparition pour enchaîner plusieurs blocs (en secondes). */
  delay?: number;
}

// Apparition douce au scroll (fade + léger translate), déclenchée à l'entrée
// dans le viewport. Respecte prefers-reduced-motion : pas de translate animé.
export default function SectionWrapper({
  children,
  id,
  className,
  delay = 0,
}: SectionWrapperProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}
