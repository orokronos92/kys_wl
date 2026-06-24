import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SOCIETE, HEBERGEUR, EMAIL_RGPD } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales — KYS",
  description: "Mentions légales du site KYS.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout titre="Mentions légales">
      <section className="space-y-1.5">
        <h2 className="text-base font-bold text-marine">Éditeur du site</h2>
        <p>
          {SOCIETE.nom}, {SOCIETE.forme} au capital de {SOCIETE.capital}.
        </p>
        <p>Siège social : {SOCIETE.adresse}, France.</p>
        <p>
          RCS {SOCIETE.rcs} — SIRET {SOCIETE.siret} — TVA intracommunautaire{" "}
          {SOCIETE.tva}.
        </p>
        <p>Directeur de la publication : {SOCIETE.directeurPublication}.</p>
        <p>
          Contact :{" "}
          <a
            href={`mailto:${EMAIL_RGPD}`}
            className="font-medium text-azur underline underline-offset-2"
          >
            {EMAIL_RGPD}
          </a>
          .
        </p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-base font-bold text-marine">Hébergeur</h2>
        <p>
          {HEBERGEUR.nom} — {HEBERGEUR.adresse}. {HEBERGEUR.note}
        </p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-base font-bold text-marine">
          Propriété intellectuelle
        </h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, visuels,
          logo, éléments graphiques) est protégé par le droit de la propriété
          intellectuelle. Toute reproduction ou réutilisation sans autorisation
          préalable est interdite.
        </p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-base font-bold text-marine">
          Données personnelles
        </h2>
        <p>
          Le traitement de vos données personnelles est décrit dans notre{" "}
          <a
            href="/confidentialite"
            className="font-medium text-azur underline underline-offset-2"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
