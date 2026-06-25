import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour une image Docker légère (serveur + node_modules tracé).
  output: "standalone",
  // better-sqlite3 est un module natif : on le garde hors du bundle serveur.
  serverExternalPackages: ["better-sqlite3", "nodemailer"],
  // Le HTML de la page doit toujours être revalidé (sinon les caches navigateur/CDN
  // gardent l'ancienne version jusqu'à 1 an). Les assets statiques (/_next/static,
  // hashés) gardent leur cache long géré par Next.
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
