import WaitlistProvider from "@/components/WaitlistProvider";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import PillarsSection from "@/components/sections/PillarsSection";
import QuestionnaireSection from "@/components/sections/QuestionnaireSection";
import WhySection from "@/components/sections/WhySection";
import SignupSection from "@/components/sections/SignupSection";

export default function Home() {
  return (
    <WaitlistProvider>
      <main>
        <HeroSection />
        <ProblemSection />
        <PillarsSection />
        <QuestionnaireSection />
        <WhySection />
        <SignupSection />
      </main>
    </WaitlistProvider>
  );
}
