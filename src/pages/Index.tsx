import { PublicNavigation } from "@/components/navigation/PublicNavigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CtaSection } from "@/components/landing/CtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CtaSection />
    </div>
  );
};

export default Index;