"use client";

import { motion, useReducedMotion } from "framer-motion";

interface CompteurPlacesProps {
  seuil: number;
  placesRestantes: number;
  /** Affiche un état neutre tant que la valeur live n'est pas chargée. */
  chargement?: boolean;
}

// Compteur de places fondateurs + barre de progression (remplie = places prises).
export default function CompteurPlaces({
  seuil,
  placesRestantes,
  chargement = false,
}: CompteurPlacesProps) {
  const reduce = useReducedMotion();
  const prises = Math.max(0, seuil - placesRestantes);
  const pct = seuil > 0 ? Math.min(100, (prises / seuil) * 100) : 0;
  const complet = placesRestantes <= 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-marine/80">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-azur" aria-hidden>
            <path
              fill="currentColor"
              d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9 13c-3.3 0-6 1.8-6 4.5V20h12v-2.5C15 14.8 12.3 13 9 13Zm7 .3c.6.8 1 1.8 1 3.2V20h4v-2.5c0-2.3-2.2-3.9-5-4.2Z"
            />
          </svg>
          Places restantes
        </span>
        <span className="font-bold tabular-nums text-azur">
          {chargement ? "…" : placesRestantes} / {seuil}
        </span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ciel-deep">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-azur to-azur-soft"
          initial={{ width: 0 }}
          animate={{ width: chargement ? "0%" : `${pct}%` }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <p className="mt-2 text-right text-xs font-medium text-marine/60">
        {chargement
          ? " "
          : complet
            ? "Offre complète"
            : `${placesRestantes} ${placesRestantes > 1 ? "places disponibles" : "place disponible"}`}
      </p>
    </div>
  );
}
