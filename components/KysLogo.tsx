interface KysLogoProps {
  className?: string;
  /** Affiche le mot-clé "Kys" à côté du pictogramme. */
  withWordmark?: boolean;
  /** "md" par défaut ; "lg" = +150% (header). */
  size?: "md" | "lg";
}

// Logo provisoire : dent stylisée avec sourire intégré + mot "Kys".
// À remplacer par le fichier officiel fourni par le client (cf. PRD §7 LOGO_KYS).
export default function KysLogo({
  className,
  withWordmark = true,
  size = "md",
}: KysLogoProps) {
  const isLg = size === "lg";
  return (
    <span
      className={`inline-flex items-center ${isLg ? "gap-3" : "gap-2"} ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 48 48"
        role="img"
        aria-label="Logo KYS"
        className={isLg ? "h-12 w-12" : "h-8 w-8"}
      >
        <path
          d="M24 6c-5 0-7-2.5-11-2.5C8 3.5 5 7 5 13c0 7 2.5 11 4.5 18C11 36 11 42 14.5 42c3 0 3.5-5 5-9 1-2.5 2.5-4 4.5-4s3.5 1.5 4.5 4c1.5 4 2 9 5 9 3.5 0 3.5-6 5-11 2-7 4.5-11 4.5-18 0-6-3-9.5-8-9.5-4 0-6 2.5-11 2.5Z"
          fill="var(--color-azur)"
        />
        <path
          d="M17 26c2 2.2 4.3 3.3 7 3.3s5-1.1 7-3.3"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      {withWordmark && (
        <span
          className={`font-display font-extrabold tracking-tight text-marine ${
            isLg ? "text-4xl" : "text-2xl"
          }`}
        >
          Kys
        </span>
      )}
    </span>
  );
}
