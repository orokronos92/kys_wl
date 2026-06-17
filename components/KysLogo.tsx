import Image from "next/image";

interface KysLogoProps {
  className?: string;
  /** "md" par défaut ; "lg" = header (plus grand). */
  size?: "md" | "lg";
  /** true pour les usages above-the-fold (header) afin d'éviter le lazy-load. */
  priority?: boolean;
}

// Logo officiel KYS (picto dent + mot « Kys »), fourni par le client.
// Asset détouré sur fond transparent : public/visuels/logo-kys.webp.
const LOGO_RATIO = 1081 / 760;
const HEIGHTS = { md: 40, lg: 128 } as const;

export default function KysLogo({
  className,
  size = "md",
  priority = false,
}: KysLogoProps) {
  const height = HEIGHTS[size];
  const width = Math.round(height * LOGO_RATIO);
  return (
    <Image
      src="/visuels/logo-kys.webp"
      alt="Logo KYS"
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto ${className ?? ""}`}
      style={{ height, width }}
    />
  );
}
