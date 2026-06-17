"use client";

import { useState, useTransition, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { enregistrerVerbatim } from "@/app/actions";
import { ToothIcon } from "@/components/icons/PillarIcons";

interface ConfirmationScreenProps {
  email: string;
  dejaInscrit?: boolean;
  rang?: number;
  estFondateur?: boolean;
}

// Écran de confirmation après inscription (PRD §5).
// La Q4 verbatim (facultative) n'apparaît qu'ici, pour ne pas freiner la conversion.
export default function ConfirmationScreen({
  email,
  dejaInscrit,
  rang,
  estFondateur,
}: ConfirmationScreenProps) {
  const [verbatim, setVerbatim] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  function handleVerbatim(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await enregistrerVerbatim(email, verbatim);
      if (res.ok) setEnvoye(true);
      else setError(res.error ?? "Impossible d'enregistrer, réessayez.");
    });
  }

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-white p-6 text-center shadow-xl shadow-marine/5 ring-1 ring-inset ring-ciel-deep sm:p-8"
    >
      <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-ciel text-azur ring-1 ring-inset ring-ciel-deep">
        <ToothIcon className="h-8 w-8" />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-marine">
        {dejaInscrit ? "Vous êtes déjà des nôtres !" : "Vous êtes inscrit(e) !"}
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-marine/70">
        Merci de votre confiance. On vous tient au courant du lancement de KYS,
        directement par e-mail.
      </p>

      {!dejaInscrit && rang ? (
        estFondateur ? (
          <p className="mx-auto mt-4 max-w-sm rounded-2xl bg-ciel/60 px-4 py-3 text-sm font-semibold text-marine ring-1 ring-inset ring-ciel-deep">
            🎉 Vous êtes le {rang === 1 ? "1ᵉʳ" : `${rang}ᵉ`} inscrit — votre
            diagnostic dentaire offert est réservé.
          </p>
        ) : (
          <p className="mx-auto mt-4 max-w-sm rounded-2xl bg-ciel/60 px-4 py-3 text-sm font-medium text-marine/80 ring-1 ring-inset ring-ciel-deep">
            Vous êtes le {rang === 1 ? "1ᵉʳ" : `${rang}ᵉ`} inscrit sur la liste
            d&apos;attente.
          </p>
        )
      ) : null}

      {!envoye ? (
        <form onSubmit={handleVerbatim} className="mt-8 text-left">
          <label
            htmlFor="verbatim"
            className="block text-sm font-semibold text-marine"
          >
            En une phrase, qu&apos;est-ce qui vous manque aujourd&apos;hui pour
            un vrai suivi préventif de la santé de vos enfants ?
            <span className="ml-1 font-normal text-marine/50">
              (facultatif)
            </span>
          </label>
          <textarea
            id="verbatim"
            value={verbatim}
            onChange={(e) => setVerbatim(e.target.value)}
            rows={3}
            placeholder="Votre réponse, librement…"
            className="mt-3 w-full resize-none rounded-2xl border border-ciel-deep bg-white px-4 py-3 text-base text-marine outline-none transition focus:border-azur focus:ring-4 focus:ring-azur/15"
          />
          <button
            type="submit"
            disabled={pending || verbatim.trim().length === 0}
            className="mt-3 h-12 w-full rounded-full bg-azur px-6 text-base font-semibold text-white shadow-lg shadow-azur/25 transition-colors hover:bg-azur-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Envoi…" : "Envoyer ma réponse"}
          </button>
          {error && (
            <p className="mt-3 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
        </form>
      ) : (
        <p className="mt-8 rounded-2xl bg-ciel/60 px-4 py-3 text-sm font-medium text-marine">
          Merci, votre réponse nous est précieuse. 💙
        </p>
      )}
    </motion.div>
  );
}
