import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Liste d'attente KYS. Une ligne = un inscrit.
// Le consentement RGPD et son horodatage sont conservés comme preuve (cf. PRD §8).
export const inscriptions = sqliteTable("inscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  consentement: integer("consentement", { mode: "boolean" }).notNull(),
  consentementAt: integer("consentement_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// Réponses au questionnaire de qualification, rattachées à l'inscrit (lien email↔réponses, cf. PRD §8).
// Les valeurs sont stockées comme codes lisibles définis côté questionnaire (Lot 3).
export const reponses = sqliteTable("reponses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  inscriptionId: integer("inscription_id")
    .notNull()
    .references(() => inscriptions.id, { onDelete: "cascade" }),
  q1Donnees: text("q1_donnees"),
  q2Famille: text("q2_famille"),
  q3Prevention: text("q3_prevention"),
  q4Verbatim: text("q4_verbatim"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Inscription = typeof inscriptions.$inferSelect;
export type NouvelleInscription = typeof inscriptions.$inferInsert;
export type Reponse = typeof reponses.$inferSelect;
export type NouvelleReponse = typeof reponses.$inferInsert;
