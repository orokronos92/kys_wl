import SectionWrapper from "@/components/SectionWrapper";
import CarteCaries from "./why/CarteCaries";
import CarteSuivi from "./why/CarteSuivi";
import CarteUsure from "./why/CarteUsure";
import CartePlaque from "./why/CartePlaque";

// Section « Pourquoi agir tôt ? » — 4 cartes chiffrées, une data-viz distincte chacune.
// Placée juste avant l'inscription : « voilà pourquoi » → « rejoignez la liste ».
export default function WhySection() {
  return (
    <SectionWrapper
      id="pourquoi-agir"
      className="bg-gradient-to-b from-ciel to-white"
    >
      <div className="mx-auto w-full max-w-md px-5 py-20 sm:max-w-xl lg:max-w-3xl">
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CarteCaries index={0} />
          <CarteSuivi index={1} />
          <CarteUsure index={2} />
          <CartePlaque index={3} />
        </div>
      </div>
    </SectionWrapper>
  );
}
