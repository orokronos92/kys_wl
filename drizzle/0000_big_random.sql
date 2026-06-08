CREATE TABLE `inscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`consentement` integer NOT NULL,
	`consentement_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inscriptions_email_unique` ON `inscriptions` (`email`);--> statement-breakpoint
CREATE TABLE `reponses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inscription_id` integer NOT NULL,
	`q1_donnees` text,
	`q2_famille` text,
	`q3_prevention` text,
	`q4_verbatim` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`inscription_id`) REFERENCES `inscriptions`(`id`) ON UPDATE no action ON DELETE cascade
);
