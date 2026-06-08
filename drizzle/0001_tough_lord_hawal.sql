PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_inscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`consentement` integer NOT NULL,
	`consentement_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_inscriptions`("id", "email", "consentement", "consentement_at", "created_at") SELECT "id", "email", "consentement", "consentement_at", "created_at" FROM `inscriptions`;--> statement-breakpoint
DROP TABLE `inscriptions`;--> statement-breakpoint
ALTER TABLE `__new_inscriptions` RENAME TO `inscriptions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `inscriptions_email_unique` ON `inscriptions` (`email`);