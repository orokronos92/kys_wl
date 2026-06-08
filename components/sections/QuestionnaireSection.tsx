import SectionWrapper from "@/components/SectionWrapper";
import QuestionnaireFlow from "@/components/questionnaire/QuestionnaireFlow";

// Section 4 — Questionnaire de qualification (PRD §4).
export default function QuestionnaireSection() {
  return (
    <SectionWrapper id="questionnaire" className="bg-ciel">
      <div className="mx-auto w-full max-w-md px-5 py-20 sm:max-w-xl lg:max-w-2xl">
        <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-azur">
          2 minutes pour mieux vous connaître
        </p>
        <QuestionnaireFlow />
      </div>
    </SectionWrapper>
  );
}
