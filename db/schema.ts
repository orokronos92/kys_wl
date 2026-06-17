import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Liste d'attente KYS. Une ligne = un inscrit.
// Le consentement RGPD et son horodatage sont conservés comme preuve (cf. PRD §8).
// `rang` + `estFondateur` rattachent l'offre fondateurs (diagnostic offert) à l'email.
export const inscriptions = sqliteTable("inscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  consentement: integer("consentement", { mode: "boolean" }).notNull(),
  consentementAt: integer("consentement_at", { mode: "timestamp" }).notNull(),
  // Position d'inscription (1, 2, 3…), figée à l'inscription.
  rang: integer("rang").notNull().default(0),
  // true si l'inscrit fait partie des premières places fondateurs (diagnostic offert).
  estFondateur: integer("est_fondateur", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// Paramètres de l'offre fondateurs — une seule ligne (id = 1), éditable en base
// sans redéploiement (seuil de places, avance marketing, activation de l'offre).
export const parametresOffre = sqliteTable("parametres_offre", {
  id: integer("id").primaryKey(),
  // Nombre total de places fondateurs affichées.
  seuil: integer("seuil").notNull().default(100),
  // « Avance marketing » : places comptées comme déjà prises au démarrage.
  placesOffset: integer("places_offset").notNull().default(0),
  // Coupe l'offre (bascule en liste d'attente simple) sans la supprimer.
  offreActive: integer("offre_active", { mode: "boolean" })
    .notNull()
    .default(true),
  updatedAt: integer("updated_at", { mode: "timestamp" })
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
export type ParametresOffre = typeof parametresOffre.$inferSelect;
