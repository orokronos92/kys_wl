import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

// Applique les migrations Drizzle au démarrage du conteneur.
// N'utilise que des dépendances de production (drizzle-orm + better-sqlite3),
// pas drizzle-kit. Le dossier ./drizzle (SQL + meta) est embarqué dans l'image.
const path = process.env.DATABASE_PATH ?? "./data/kys.db";

const sqlite = new Database(path);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

migrate(drizzle(sqlite), { migrationsFolder: "./drizzle" });
sqlite.close();

console.log(`Migrations Drizzle appliquées sur ${path}`);
