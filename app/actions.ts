"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inscriptions, reponses } from "@/db/schema";
import type { QuestionId } from "@/lib/questions";

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
    db.transaction((tx) => {
      const [inscription] = tx
        .insert(inscriptions)
        .values({
          email,
          consentement: true,
          consentementAt: new Date(),
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
    });

    return { ok: true };
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
