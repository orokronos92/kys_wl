"use server";

import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { inscriptions, parametresOffre, reponses } from "@/db/schema";
import type { QuestionId } from "@/lib/questions";
import { OFFRE_DEFAUTS, type OffreState } from "@/lib/offre";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface InscriptionInput {
  email: string;
  consentement: boolean;
  answers: Partial<Record<QuestionId, string>>;
}

export interface ActionResult {
  ok: boolean;
  error?: string;
  dejaInscrit?: boolean;
  rang?: number;
  estFondateur?: boolean;
  placesRestantes?: number;
}

// Paramètres de l'offre fondateurs, avec repli si la ligne n'est pas seedée.
function lireParametresOffre() {
  const [p] = db.select().from(parametresOffre).where(eq(parametresOffre.id, 1)).all();
  return {
    seuil: p?.seuil ?? OFFRE_DEFAUTS.seuil,
    placesOffset: p?.placesOffset ?? OFFRE_DEFAUTS.placesOffset,
    offreActive: p?.offreActive ?? OFFRE_DEFAUTS.offreActive,
  };
}

// État de l'offre pour le compteur affiché sur le site (lecture seule, temps réel).
export async function getOffreState(): Promise<OffreState> {
  const { seuil, placesOffset, offreActive } = lireParametresOffre();
  const [{ total }] = db
    .select({ total: count() })
    .from(inscriptions)
    .all();
  const placesRestantes = Math.max(0, seuil - (placesOffset + total));
  return { seuil, placesRestantes, offreActive: offreActive && placesRestantes > 0 };
}

// Enregistre un inscrit + ses réponses, liés par l'email (RGPD §8).
// Le consentement et son horodatage sont la preuve conservée.
export async function inscrire(input: InscriptionInput): Promise<ActionResult> {
  const email = input.email.trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Adresse e-mail invalide." };
  }
  if (!input.consentement) {
    return {
      ok: false,
      error: "Le consentement est nécessaire pour vous inscrire.",
    };
  }

  try {
    // Inscription + réponses dans une seule transaction : pas d'inscrit orphelin
    // sans réponses si le second insert échoue (better-sqlite3 = transaction sync).
    // Le rang et le statut fondateur sont figés ici (COUNT atomique, pas de course).
    const { seuil, placesOffset, offreActive } = lireParametresOffre();
    const resultat = db.transaction((tx) => {
      const [{ total }] = tx
        .select({ total: count() })
        .from(inscriptions)
        .all();
      const rang = total + 1;
      const estFondateur = offreActive && placesOffset + rang <= seuil;

      const [inscription] = tx
        .insert(inscriptions)
        .values({
          email,
          consentement: true,
          consentementAt: new Date(),
          rang,
          estFondateur,
        })
        .returning({ id: inscriptions.id })
        .all();

      tx
        .insert(reponses)
        .values({
          inscriptionId: inscription.id,
          q1Donnees: input.answers.q1 ?? null,
          q2Famille: input.answers.q2 ?? null,
          q3Prevention: input.answers.q3 ?? null,
        })
        .run();

      const placesRestantes = Math.max(0, seuil - (placesOffset + total + 1));
      return { rang, estFondateur, placesRestantes };
    });

    return { ok: true, ...resultat };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: string }).code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      // Email déjà présent : on ne crée pas de doublon, l'inscription tient.
      return { ok: true, dejaInscrit: true };
    }
    console.error("inscrire:", error);
    return {
      ok: false,
      error: "Une erreur est survenue. Merci de réessayer dans un instant.",
    };
  }
}

// Q4 (verbatim) — facultative, soumise APRÈS l'inscription (PRD §4/§5).
// Ne bloque jamais : un verbatim vide est un succès silencieux.
export async function enregistrerVerbatim(
  email: string,
  verbatim: string,
): Promise<ActionResult> {
  const clean = verbatim.trim();
  if (!clean) return { ok: true };

  const mail = email.trim().toLowerCase();

  try {
    const [inscription] = await db
      .select({ id: inscriptions.id })
      .from(inscriptions)
      .where(eq(inscriptions.email, mail));

    if (!inscription) return { ok: false, error: "Inscription introuvable." };

    const [reponse] = await db
      .select({ id: reponses.id })
      .from(reponses)
      .where(eq(reponses.inscriptionId, inscription.id));

    if (reponse) {
      await db
        .update(reponses)
        .set({ q4Verbatim: clean })
        .where(eq(reponses.id, reponse.id));
    } else {
      await db
        .insert(reponses)
        .values({ inscriptionId: inscription.id, q4Verbatim: clean });
    }

    return { ok: true };
  } catch (error) {
    console.error("enregistrerVerbatim:", error);
    return { ok: false, error: "Impossible d'enregistrer pour le moment." };
  }
}
