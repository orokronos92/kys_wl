"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnswerButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

// Réponse tappable : grande cible au pouce, retour visuel à la sélection.
export default function AnswerButton({
  label,
  selected,
  onSelect,
}: AnswerButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      aria-pressed={selected}
      className={`w-full rounded-2xl border px-5 py-4 text-left text-base leading-snug transition-colors ${
        selected
          ? "border-azur bg-azur text-white shadow-lg shadow-azur/25"
          : "border-ciel-deep bg-white text-marine hover:border-azur/50 hover:bg-ciel/40"
      }`}
    >
      {label}
    </motion.button>
  );
}
