import { SOCIETE, EMAIL_RGPD, DUREE_CONSERVATION } from "@/lib/legal";

// Mention d'information RGPD (PRD §8) — dépliable natif, accessible, sans JS.
// Synthèse ; le détail complet est sur la page /confidentialite.
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
          {SOCIETE.nom}.
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
          vous recontacter au sujet de KYS.
        </p>
        <p>
          <strong className="font-semibold text-marine">Base légale :</strong>{" "}
          votre consentement.
        </p>
        <p>
          <strong className="font-semibold text-marine">Conservation :</strong>{" "}
          {DUREE_CONSERVATION}.
        </p>
        <p>
          <strong className="font-semibold text-marine">Vos droits :</strong>{" "}
          accès, rectification, effacement, opposition, limitation, portabilité
          et retrait du consentement sur simple demande à{" "}
          <a
            href={`mailto:${EMAIL_RGPD}`}
            className="font-medium text-azur underline underline-offset-2"
          >
            {EMAIL_RGPD}
          </a>
          , ou réclamation auprès de la CNIL.
        </p>
        <p>
          <a
            href="/confidentialite"
            className="font-medium text-azur underline underline-offset-2"
          >
            Politique de confidentialité complète
          </a>
        </p>
      </div>
    </details>
  );
}
