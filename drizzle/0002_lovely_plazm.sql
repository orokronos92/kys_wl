CREATE TABLE `parametres_offre` (
	`id` integer PRIMARY KEY NOT NULL,
	`seuil` integer DEFAULT 100 NOT NULL,
	`places_offset` integer DEFAULT 0 NOT NULL,
	`offre_active` integer DEFAULT true NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `inscriptions` ADD `rang` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `inscriptions` ADD `est_fondateur` integer DEFAULT false NOT NULL;--> statement-breakpoint
-- Seed des paramètres de l'offre (ligne unique id=1). Compteur démarre à 80 (offset 20 / seuil 100).
INSERT OR IGNORE INTO `parametres_offre` (`id`, `seuil`, `places_offset`, `offre_active`) VALUES (1, 100, 20, 1);--> statement-breakpoint
-- Backfill : rang des inscrits existants (ordre d'inscription).
UPDATE `inscriptions` SET `rang` = (SELECT COUNT(*) FROM `inscriptions` t WHERE t.`id` <= `inscriptions`.`id`);--> statement-breakpoint
-- Backfill : statut fondateur selon (offset + rang) <= seuil.
UPDATE `inscriptions` SET `est_fondateur` = CASE WHEN ((SELECT `places_offset` FROM `parametres_offre` WHERE `id` = 1) + `rang`) <= (SELECT `seuil` FROM `parametres_offre` WHERE `id` = 1) THEN 1 ELSE 0 END;