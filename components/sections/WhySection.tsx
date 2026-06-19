import SectionWrapper from "@/components/SectionWrapper";
import CarteCaries from "./why/CarteCaries";
import CarteSuivi from "./why/CarteSuivi";
import CarteUsure from "./why/CarteUsure";
import CartePlaque from "./why/CartePlaque";

// Section « Pourquoi agir tôt ? » — une grande carte contenant 4 tuiles (2×2,
// visibles d'un coup même sur mobile). Détail dépliable au tap, animations en boucle.
export default function WhySection() {
  return (
    <SectionWrapper id="pourquoi-agir" className="bg-white">
      <div className="mx-auto w-full max-w-md px-5 pb-7 pt-20 sm:max-w-xl lg:max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-azur">
          Le constat chiffré
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-marine sm:text-4xl">
          Pourquoi agir <span className="text-azur">tôt</span> ?
        </h2>
        <p className="mt-3 text-marine/70">
          Les signaux sont là bien avant la douleur. Quatre raisons concrètes de
          ne pas attendre.
        </p>

        <div className="mt-8 rounded-3xl bg-ciel p-3 shadow-xl shadow-marine/5 ring-1 ring-inset ring-ciel-deep sm:p-4">
          <div className="flex flex-col gap-3">
            <CarteCaries index={0} />
            <CarteSuivi index={1} />
            <CarteUsure index={2} />
            <CartePlaque index={3} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
