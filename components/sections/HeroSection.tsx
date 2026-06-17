import SectionWrapper from "@/components/SectionWrapper";
import KysLogo from "@/components/KysLogo";
import EmailSignupForm from "@/components/EmailSignupForm";
import Visuel from "@/components/Visuel";

// Section 1 — Accroche + inscription (above the fold).
export default function HeroSection() {
  return (
    <SectionWrapper
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-ciel to-white"
    >
      <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-5 pb-12 pt-6 sm:max-w-xl lg:max-w-2xl">
        <header className="flex items-center">
          <KysLogo size="lg" priority />
        </header>

        <div className="flex flex-1 flex-col justify-center gap-6 py-8">
          <h1 className="text-[2rem] font-extrabold leading-[1.1] text-marine sm:text-5xl">
            Le sourire de votre famille mérite plus qu&apos;un rendez-vous,{" "}
            <span className="text-azur">mais une protection pour la vie.</span>
          </h1>
          <p className="text-base leading-relaxed text-marine/70 sm:text-lg">
            Et si protéger votre famille commençait par une vraie action ?
            Rejoignez les premiers inscrits.
          </p>
          <EmailSignupForm buttonLabel="Je protège ma famille" />
        </div>

        <Visuel
          src="/visuels/hero-famille.webp"
          width={1122}
          height={1402}
          priority
          alt="Famille souriante — deux parents et deux enfants, sourires naturels, lumière douce dans un intérieur clair bleu et blanc."
        />
      </div>
    </SectionWrapper>
  );
}
