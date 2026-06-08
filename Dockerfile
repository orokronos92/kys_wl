# syntax=docker/dockerfile:1

# ---------- Build ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Outils nécessaires à la compilation de better-sqlite3 (module natif, musl/alpine)
RUN apk add --no-cache python3 make g++ libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Le dossier data/ est exclu (.dockerignore) ; on le crée pour que l'ouverture
# de la base au moment du build (import du client Drizzle) ne casse pas.
RUN mkdir -p data

# Build Next.js en mode standalone
RUN npm run build

# ---------- Runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_PATH=/app/data/kys.db

RUN apk add --no-cache libc6-compat

# Sortie standalone de Next (serveur + node_modules minimal tracé)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Migrations + script + dépendances complètes nécessaires à leur exécution.
# On superpose drizzle-orm (pour le sous-module migrator) et better-sqlite3
# (binaire natif) afin de garantir leur présence au runtime.
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/node_modules/drizzle-orm ./node_modules/drizzle-orm
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Point de montage de la base (le volume Docker le recouvre au runtime)
RUN mkdir -p /app/data

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
