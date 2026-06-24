import Link from "next/link";
import { SOCIETE } from "@/lib/legal";

// Pied de page global : liens légaux obligatoires + copyright.
export default function Footer() {
  return (
    <footer className="bg-marine text-ciel/80">
      <div className="mx-auto w-full max-w-2xl px-5 py-8 text-center text-xs">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link
            href="/mentions-legales"
            className="font-medium text-ciel transition-colors hover:text-white"
          >
            Mentions légales
          </Link>
          <span aria-hidden className="text-ciel/40">
            ·
          </span>
          <Link
            href="/confidentialite"
            className="font-medium text-ciel transition-colors hover:text-white"
          >
            Confidentialité
          </Link>
        </nav>
        <p className="mt-4 text-ciel/60">© 2026 {SOCIETE.nom}</p>
      </div>
    </footer>
  );
}
