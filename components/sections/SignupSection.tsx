import SectionWrapper from "@/components/SectionWrapper";
import KysLogo from "@/components/KysLogo";
import SignupForm from "@/components/signup/SignupForm";

// Section 5 — Inscription + confirmation (PRD §5).
export default function SignupSection() {
  return (
    <SectionWrapper
      id="inscription"
      className="bg-gradient-to-b from-white to-ciel"
    >
      <div className="mx-auto w-full max-w-md px-5 py-20 sm:max-w-xl lg:max-w-2xl">
        <SignupForm />

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <KysLogo />
          <p className="font-display text-lg font-semibold text-marine">
            Prévenir aujourd&apos;hui, sourire demain.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
