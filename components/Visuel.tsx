import Image from "next/image";

interface VisuelProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** true pour un visuel above-the-fold (LCP) ; sinon lazy par défaut. */
  priority?: boolean;
}

// Visuel final via next/image : responsive, WebP optimisé, lazy par défaut.
// Le ratio est tenu par width/height (pas de décalage de mise en page).
export default function Visuel({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: VisuelProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 672px"
      className={`h-auto w-full rounded-3xl ${className ?? ""}`}
    />
  );
}
