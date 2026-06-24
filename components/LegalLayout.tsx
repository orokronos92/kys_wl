import Link from "next/link";
import type { ReactNode } from "react";
import { MAJ_LEGALE } from "@/lib/legal";

// Gabarit commun des pages légales (mentions légales, confidentialité) :
// lisible, mobile-first, dans la charte KYS.
export default function LegalLayout({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-azur"
      >
        ‹ Retour à l&apos;accueil
      </Link>
      <h1 className="mt-6 text-3xl font-extrabold leading-tight text-marine sm:text-4xl">
        {titre}
      </h1>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-marine/80">
        {children}
      </div>
      <p className="mt-12 text-xs text-marine/45">
        Dernière mise à jour : {MAJ_LEGALE}.
      </p>
    </main>
  );
}
