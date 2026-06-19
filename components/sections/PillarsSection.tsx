import SectionWrapper from "@/components/SectionWrapper";
import PillarCard from "@/components/PillarCard";
import {
  ShieldIcon,
  FamilyIcon,
  ToothIcon,
  HeartIcon,
} from "@/components/icons/PillarIcons";

const piliers = [
  {
    icon: <ShieldIcon className="h-6 w-6" />,
    title: "Prévention efficace",
    description:
      "Détecter tôt, agir avant que le problème s'installe. La santé dentaire se joue en amont, pas dans l'urgence.",
  },
  {
    icon: <FamilyIcon className="h-6 w-6" />,
    title: "Pour toute la famille",
    description:
      "Un suivi pour chaque membre, des enfants aux parents. Les mêmes bons réflexes, à chaque âge.",
  },
  {
    icon: <ToothIcon className="h-6 w-6" />,
    title: "Soins doux et modernes",
    description:
      "La technologie au service du confort, pour des soins sereins et sans appréhension.",
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    title: "Confiance durable",
    description:
      "Votre empreinte numérique existe sans doute déjà : autant la sécuriser. Vos données de sourire, sauvegardées et sécurisées dans le temps, accessibles quand vous en avez besoin !",
  },
];

// Section 3 — Les 4 piliers KYS (Solution du PAS).
export default function PillarsSection() {
  return (
    <SectionWrapper id="piliers" className="bg-white">
      <div className="mx-auto w-full max-w-md px-5 py-20 sm:max-w-xl lg:max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-azur">
          La réponse KYS
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-marine sm:text-4xl">
          Quatre promesses pour{" "}
          <span className="text-azur">protéger durablement</span> votre famille.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {piliers.map((pilier, i) => (
            <PillarCard key={pilier.title} index={i} {...pilier} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
