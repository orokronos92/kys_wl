# KYS Waiting List — CLAUDE.md

## Langue
Tu réponds et tu rédiges TOUJOURS en français — explications, commentaires de code, messages de commit. Aucune exception.

## Projet
Landing page "liste d'attente" pour KYS, une app de santé dentaire familiale. Page unique, consultée au smartphone via QR code en salle d'attente. Objectif : collecter des inscrits + qualifier l'intérêt avant une levée de fonds. Les specs détaillées seront fournies dans un PRD séparé.

## Stack
- Next.js (App Router, rendu statique prioritaire)
- Tailwind CSS
- Framer Motion (animations)
- SQLite embarqué directement dans l'app Next.js : un fichier .db local au projet, via Drizzle. Pas de serveur de base, pas de service externe. Le fichier est monté sur un volume Docker pour la persistance. Indépendant de l'infra du VPS où ce sera déployé.
- Déploiement : Docker + Traefik (HTTPS auto)

## Règles de code — IMPÉRATIF
- Composants RÉUTILISABLES, un par élément d'UI / section.
- 200 à 300 lignes MAX par composant. Au-delà, découper.
- Mobile-first absolu, puis responsive tablette/PC. L'usage réel est le téléphone.
- Qualité esthétique = argument commercial : soigné, moderne, animations fluides.
- TypeScript, code propre, pas de commentaires superflus.

## Workflow
- Travailler de façon incrémentale, étape par étape.
- Vérifier le typecheck après chaque série de modifications.
- Corrections ciblées plutôt que réécritures complètes.
- Documenter ici les commandes de build/dev/migration au fur et à mesure.

## Commandes
| But | Commande |
| --- | --- |
| Serveur de dev (http://localhost:3000) | `npm run dev` |
| Build de production | `npm run build` |
| Lancer le build | `npm run start` |
| Typecheck (sans émettre) | `npm run typecheck` |
| Lint | `npm run lint` |
| Générer une migration depuis `db/schema.ts` | `npm run db:generate` |
| Appliquer les migrations à la base | `npm run db:migrate` |
| Pousser le schéma directement (dev rapide, sans fichier de migration) | `npm run db:push` |
| Explorer la base (Drizzle Studio) | `npm run db:studio` |

### Base de données
- Fichier SQLite : `./data/kys.db` (surchargeable via `DATABASE_PATH`). Dossier `data/` destiné à un volume Docker.
- Client Drizzle : `db/index.ts`. Schéma : `db/schema.ts` (vide tant que le PRD n'est pas fourni).
- Config drizzle-kit : `drizzle.config.ts`. Migrations générées dans `drizzle/`.
- Accès base côté serveur uniquement (Server Actions / route handlers), jamais exposé au client.

### Déploiement (Docker + Traefik)
- En ligne : https://kys-wl.srv1301090.hstgr.cloud (Traefik, réseau externe `proxy`).
- Build + (re)déploiement : `docker compose build && docker compose up -d`.
- Logs : `docker compose logs --tail=50`.
- Image Next standalone (node:22-alpine), conteneur en root. Migrations appliquées au démarrage par `docker-entrypoint.sh` → `scripts/migrate.mjs`.
- Persistance : volume hôte `/docker/kys_wl/app/data` → `/app/data` (base SQLite). Ne jamais supprimer ce dossier.

### Versions clés
Next.js 16.2.7 · React 19.2.4 · Tailwind CSS v4 · Framer Motion 12 · Drizzle ORM 0.45 · better-sqlite3 12 · drizzle-kit 0.31 · TypeScript 5.
