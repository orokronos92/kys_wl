import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour une image Docker légère (serveur + node_modules tracé).
  output: "standalone",
  // better-sqlite3 est un module natif : on le garde hors du bundle serveur.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
