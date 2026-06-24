import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SOCIETE, HEBERGEUR, EMAIL_RGPD, DUREE_CONSERVATION } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité — KYS",
  description: "Comment KYS collecte et protège vos données personnelles.",
};

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h2 className="text-base font-bold text-marine">{titre}</h2>
      {children}
    </section>
  );
}

export default function ConfidentialitePage() {
  return (
    <LegalLayout titre="Politique de confidentialité">
      <p>
        Cette page explique quelles données nous collectons lorsque vous
        rejoignez la liste d&apos;attente KYS, pourquoi, et quels sont vos
        droits.
      </p>

      <Bloc titre="Responsable de traitement">
        <p>
          {SOCIETE.nom}, {SOCIETE.forme}, dont le siège est situé{" "}
          {SOCIETE.adresse}. Représentée par {SOCIETE.directeurPublication}.
        </p>
      </Bloc>

      <Bloc titre="Données collectées">
        <p>
          Votre adresse e-mail, vos réponses au questionnaire (questions à choix
          et réponse libre facultative), la date et l&apos;heure de votre
          consentement, votre rang d&apos;inscription et votre statut
          « fondateur ».
        </p>
      </Bloc>

      <Bloc titre="Finalités">
        <p>
          Gérer la liste d&apos;attente, attribuer l&apos;offre fondateurs,
          mesurer l&apos;intérêt pour le projet et vous recontacter au sujet de
          KYS.
        </p>
      </Bloc>

      <Bloc titre="Base légale">
        <p>
          Votre <strong className="font-semibold text-marine">consentement</strong>{" "}
          (article 6-1-a du RGPD), recueilli via la case à cocher du formulaire.
        </p>
      </Bloc>

      <Bloc titre="Destinataires">
        <p>
          La société {SOCIETE.nom} uniquement, et son sous-traitant
          d&apos;hébergement ({HEBERGEUR.nom}). Aucune cession à des tiers, aucun
          transfert hors de l&apos;Union européenne.
        </p>
      </Bloc>

      <Bloc titre="Durée de conservation">
        <p>
          Vos données sont conservées {DUREE_CONSERVATION}, puis supprimées ou
          anonymisées.
        </p>
      </Bloc>

      <Bloc titre="Vos droits">
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation, d&apos;opposition, de portabilité, et
          du droit de retirer votre consentement à tout moment. Pour les
          exercer, écrivez à{" "}
          <a
            href={`mailto:${EMAIL_RGPD}`}
            className="font-medium text-azur underline underline-offset-2"
          >
            {EMAIL_RGPD}
          </a>
          . Vous pouvez également introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-azur underline underline-offset-2"
          >
            CNIL
          </a>
          .
        </p>
      </Bloc>

      <Bloc titre="Cookies et traceurs">
        <p>
          Ce site n&apos;utilise{" "}
          <strong className="font-semibold text-marine">aucun cookie</strong> ni
          traceur publicitaire ou de mesure d&apos;audience.
        </p>
      </Bloc>

      <Bloc titre="Sécurité">
        <p>
          Connexion chiffrée (HTTPS), base de données non exposée publiquement et
          accès restreint.
        </p>
      </Bloc>
    </LegalLayout>
  );
}
