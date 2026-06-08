---
name: drizzle-sqlite-pattern
description: Pattern d'accès SQLite via Drizzle, embarqué dans le Next.js.
---

# SQLite embarqué + Drizzle

## Principe
SQLite est un simple fichier .db local au projet, accédé via Drizzle. Pas de serveur de base, pas de service externe. Le fichier est monté sur un volume Docker pour persister. Indépendant de l'infra du VPS de déploiement.

## Règles
- Définir le schéma dans un fichier dédié, typé via Drizzle.
- Les accès base se font côté serveur uniquement (Server Actions / route handlers), jamais exposés au client.
- Prévoir les migrations Drizzle.
- Schéma précis (tables, champs, RGPD lié-email) : voir le PRD.
