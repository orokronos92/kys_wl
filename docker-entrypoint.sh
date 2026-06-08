#!/bin/sh
set -e

echo "→ Application des migrations Drizzle…"
node scripts/migrate.mjs

echo "→ Démarrage du serveur Next.js (standalone)…"
exec node server.js
