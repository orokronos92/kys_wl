// Adresse de contact pour l'exercice des droits RGPD.
// TODO client : confirmer l'adresse définitive et l'entité juridique KYS.
export const CONTACT_RGPD = "contact@kys-app.fr";

// Mention d'information RGPD (PRD §8) — dépliable natif, accessible, sans JS.
export default function RgpdNotice() {
  return (
    <details className="group mt-4 rounded-2xl bg-ciel/50 px-4 py-3 text-sm text-marine/80 ring-1 ring-inset ring-ciel-deep">
      <summary className="cursor-pointer list-none font-medium text-marine marker:hidden">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-azur transition-transform group-open:rotate-90">
            ›
          </span>
          Comment vos données sont-elles utilisées ?
        </span>
      </summary>

      <div className="mt-3 space-y-2 leading-relaxed">
        <p>
          <strong className="font-semibold text-marine">Responsable :</strong>{" "}
          KYS (entité en cours de constitution).
        </p>
        <p>
          <strong className="font-semibold text-marine">
            Données collectées :
          </strong>{" "}
          votre adresse e-mail et vos réponses au questionnaire.
        </p>
        <p>
          <strong className="font-semibold text-marine">Finalité :</strong>{" "}
          rejoindre la liste d&apos;attente, mesurer l&apos;intérêt du marché et
          vous recontacter éventuellement selon votre profil.
        </p>
        <p>
          <strong className="font-semibold text-marine">Conservation :</strong>{" "}
          limitée à la phase de lancement du projet.
        </p>
        <p>
          <strong className="font-semibold text-marine">Vos droits :</strong>{" "}
          accès, rectification et effacement sur simple demande à{" "}
          <a
            href={`mailto:${CONTACT_RGPD}`}
            className="font-medium text-azur underline underline-offset-2"
          >
            {CONTACT_RGPD}
          </a>
          .
        </p>
      </div>
    </details>
  );
}
