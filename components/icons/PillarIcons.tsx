import type { SVGProps } from "react";

// Pictos des 4 piliers — style « ligne » bleue (PRD §3 / §7).
// Tracés en stroke currentColor pour hériter de la couleur de la carte.
const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4" />
    </svg>
  );
}

export function FamilyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="7" r="2.4" />
      <circle cx="16.5" cy="8" r="1.9" />
      <path d="M3.5 19v-1.5A4 4 0 0 1 7.5 13h1a4 4 0 0 1 4 4V19" />
      <path d="M14 19v-1a3.3 3.3 0 0 1 3.3-3.3h.4A3.3 3.3 0 0 1 21 18v1" />
    </svg>
  );
}

export function ToothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4c-2.3 0-3.2-1.2-5-1.2C5 2.8 3.6 4.4 3.6 7c0 3.2 1.1 5 2 8.2.7 2.4.7 5.3 2.4 5.3 1.4 0 1.7-2.3 2.3-4.2.4-1.2 1-1.9 1.7-1.9s1.3.7 1.7 1.9c.6 1.9.9 4.2 2.3 4.2 1.7 0 1.7-2.9 2.4-5.3.9-3.2 2-5 2-8.2 0-2.6-1.4-4.2-3.4-4.2-1.8 0-2.7 1.2-5 1.2Z" />
    </svg>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.3S3.5 15.6 3.5 9.7C3.5 6.9 5.6 5 8 5c1.7 0 3.1 1 4 2.3C12.9 6 14.3 5 16 5c2.4 0 4.5 1.9 4.5 4.7 0 5.9-8.5 10.6-8.5 10.6Z" />
    </svg>
  );
}
