"use client";

import { useState, useTransition, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useWaitlist } from "@/components/WaitlistProvider";
import { inscrire } from "@/app/actions";
import RgpdNotice from "./RgpdNotice";
import ConfirmationScreen from "./ConfirmationScreen";

// Formulaire d'inscription final (PRD §5) : email (pré-rempli depuis le Hero) +
// consentement RGPD non pré-coché + soumission unique. Bascule en confirmation.
export default function SignupForm() {
  const { email, setEmail, answers } = useWaitlist();
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ dejaInscrit?: boolean } | null>(null);
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Merci de cocher la case de consentement pour vous inscrire.");
      return;
    }
    startTransition(async () => {
      const res = await inscrire({ email, consentement: consent, answers });
      if (res.ok) setDone({ dejaInscrit: res.dejaInscrit });
      else setError(res.error ?? "Une erreur est survenue.");
    });
  }

  if (done) {
    return <ConfirmationScreen email={email} dejaInscrit={done.dejaInscrit} />;
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl shadow-marine/5 ring-1 ring-inset ring-ciel-deep sm:p-8">
      <h2 className="text-2xl font-bold leading-snug text-marine">
        Rejoignez la liste d&apos;attente
      </h2>
      <p className="mt-2 text-marine/70">
        Soyez parmi les premiers à protéger le sourire de votre famille.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          aria-label="Votre adresse e-mail"
          className="h-13 w-full rounded-full border border-ciel-deep bg-white px-5 text-base text-marine outline-none transition focus:border-azur focus:ring-4 focus:ring-azur/15"
        />

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-marine/80">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-azur"
          />
          <span>
            J&apos;accepte que mes réponses soient associées à mon adresse
            e-mail afin de suivre mon inscription et d&apos;être recontacté(e) au
            sujet de KYS.
          </span>
        </label>

        {error && (
          <p className="text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={pending}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          className="h-14 w-full rounded-full bg-azur px-6 text-base font-semibold text-white shadow-lg shadow-azur/25 transition-colors hover:bg-azur-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Inscription…" : "Je rejoins la liste"}
        </motion.button>
      </form>

      <RgpdNotice />
    </div>
  );
}
