"use client";

import { useEffect, useState } from "react";
import { getOffreState } from "@/app/actions";
import { DIAGNOSTIC_INCLUS, OFFRE_DEFAUTS, type OffreState } from "@/lib/offre";
import CompteurPlaces from "./CompteurPlaces";

// En-tête du bloc d'inscription : offre fondateurs (diagnostic offert) + compteur live.
// Lit l'état réel au montage (page statique) ; bascule en liste d'attente si complet.
export default function OffreFondateurs() {
  const [state, setState] = useState<OffreState | null>(null);

  useEffect(() => {
    let actif = true;
    getOffreState()
      .then((s) => actif && setState(s))
      .catch(() => {});
    return () => {
      actif = false;
    };
  }, []);

  const chargement = state === null;
  const seuil = state?.seuil ?? OFFRE_DEFAUTS.seuil;
  const placesRestantes = state?.placesRestantes ?? seuil;
  const offreOuverte = chargement || state!.offreActive;

  return (
    <div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ciel px-3 py-1 text-xs font-semibold uppercase tracking-wide text-azur ring-1 ring-inset ring-ciel-deep">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path
            fill="currentColor"
            d="m12 2 2.95 5.98 6.6.96-4.77 4.65 1.12 6.57L12 17.02l-5.9 3.1 1.13-6.57L2.46 8.9l6.6-.96L12 2Z"
          />
        </svg>
        {offreOuverte
          ? `Offre fondateurs · ${seuil} places`
          : "Liste d'attente"}
      </span>

      <h2 className="mt-4 text-2xl font-bold leading-snug text-marine">
        Rejoignez la liste d&apos;attente
      </h2>
      <p className="mt-2 text-marine/70">
        {offreOuverte ? (
          <>
            Soyez parmi les {seuil} premiers et recevez votre diagnostic
            dentaire complet{" "}
            <span className="font-semibold text-azur">gratuitement</span> dès
            l&apos;ouverture.
          </>
        ) : (
          <>
            Les places fondateurs sont toutes prises. Rejoignez la liste
            d&apos;attente : on vous tient au courant de la suite.
          </>
        )}
      </p>

      {offreOuverte && (
        <div className="mt-5 rounded-2xl bg-ciel/50 p-4 ring-1 ring-inset ring-ciel-deep">
          <p className="flex items-center gap-2 text-sm font-semibold text-marine">
            <span aria-hidden>🎁</span>
            Votre diagnostic offert inclut :
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {DIAGNOSTIC_INCLUS.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm text-marine ring-1 ring-inset ring-ciel-deep"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-azur" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <CompteurPlaces
              seuil={seuil}
              placesRestantes={placesRestantes}
              chargement={chargement}
            />
          </div>
        </div>
      )}
    </div>
  );
}
