import SectionWrapper from "@/components/SectionWrapper";
import Visuel from "@/components/Visuel";

// Section 2 — Le problème (Problème + Agitation du PAS).
export default function ProblemSection() {
  return (
    <SectionWrapper
      id="probleme"
      className="bg-gradient-to-b from-marine-deep to-marine text-ciel"
    >
      <div className="mx-auto w-full max-w-md px-5 py-20 sm:max-w-xl lg:max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-azur-soft">
          Le constat
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          À chaque empreinte, des données de santé sont créées.{" "}
          <span className="text-azur-soft">Puis elles disparaissent.</span>
        </h2>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-ciel/80">
          <p>
            Aujourd&apos;hui, on consulte quand la douleur est là. Le vrai suivi
            préventif, dans le temps, n&apos;existe pas vraiment.
          </p>
          <p>
            Pourtant, à chaque empreinte dentaire, des informations sur votre
            santé sont produites. Puis{" "}
            <span className="font-semibold text-white">
              jamais analysées, jamais transmises, jamais conservées
            </span>{" "}
            de façon accessible. Elles s&apos;évaporent.
          </p>
        </div>

        <Visuel
          src="/visuels/empreinte-data.webp"
          width={1254}
          height={1254}
          alt="Empreinte dentaire 3D bleutée sur fond sombre dégradé, avec des points de données lumineux qui en émanent — esthétique tech-santé."
          className="mt-10"
        />

        <p className="mt-10 text-xl font-semibold leading-snug text-white sm:text-2xl">
          Et si ces données devenaient un véritable suivi préventif, pour vous et
          pour vos enfants ?
        </p>
      </div>
    </SectionWrapper>
  );
}
