interface VisuelPlaceholderProps {
  /** Nom du slot, ex. "VISUEL_HERO_FAMILLE" (cf. PRD §7). */
  name: string;
  /** Ratio CSS, ex. "3 / 4". */
  ratio: string;
  /** Texte alternatif définitif (en français), réutilisé pour l'image finale. */
  alt: string;
  /** Dimensions cibles indicatives, ex. "1080 × 1440". */
  dimensions?: string;
  className?: string;
  /** Palette du placeholder : clair (héro) ou sombre (empreinte/data). */
  tone?: "clair" | "sombre";
}

// Placeholder net et nommé en attendant le visuel IA fourni par le client.
// Bloc dégradé de la charte, dimensions fixées (pas de décalage de mise en page).
export default function VisuelPlaceholder({
  name,
  ratio,
  alt,
  dimensions,
  className,
  tone = "clair",
}: VisuelPlaceholderProps) {
  const palette =
    tone === "sombre"
      ? "from-marine-deep to-marine text-ciel/80 ring-marine-soft"
      : "from-ciel-deep to-white text-marine/70 ring-ciel-deep";

  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: ratio }}
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-3xl bg-gradient-to-br p-6 text-center ring-1 ring-inset ${palette} ${className ?? ""}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest opacity-70">
        Visuel à venir
      </span>
      <span className="font-display text-sm font-bold">{name}</span>
      {dimensions && (
        <span className="font-mono text-[11px] opacity-60">{dimensions}</span>
      )}
    </div>
  );
}
