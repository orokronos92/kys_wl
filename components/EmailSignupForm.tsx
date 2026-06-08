"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type FormEvent } from "react";
import { useWaitlist } from "@/components/WaitlistProvider";

interface EmailSignupFormProps {
  buttonLabel: string;
}

// Capture d'email du Hero. L'email est partagé via le contexte et pré-remplit
// le formulaire d'inscription final (flux PRD §6). La soumission ici fait
// défiler vers le questionnaire ; l'enregistrement a lieu en fin de parcours.
export default function EmailSignupForm({ buttonLabel }: EmailSignupFormProps) {
  const { email, setEmail } = useWaitlist();
  const reduce = useReducedMotion();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    document
      .getElementById("questionnaire")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <input
        type="email"
        required
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.fr"
        aria-label="Votre adresse e-mail"
        className="h-13 w-full rounded-full border border-ciel-deep bg-white px-5 text-base text-marine shadow-sm outline-none transition focus:border-azur focus:ring-4 focus:ring-azur/15"
      />
      <motion.button
        type="submit"
        whileTap={reduce ? undefined : { scale: 0.97 }}
        initial={reduce ? false : { scale: 1 }}
        whileInView={reduce ? undefined : { scale: [1, 1.03, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-13 w-full rounded-full bg-azur px-6 text-base font-semibold text-white shadow-lg shadow-azur/25 transition-colors hover:bg-azur-soft"
      >
        {buttonLabel}
      </motion.button>
    </form>
  );
}
