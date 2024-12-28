import { PublicNavigation } from "@/components/navigation/PublicNavigation";
import { HeroFeatures } from "@/components/features/HeroFeatures";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { BenefitsList } from "@/components/features/BenefitsList";
import { FeaturesCta } from "@/components/features/FeaturesCta";

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <HeroFeatures />
        <FeatureGrid />
        <BenefitsList />
        <FeaturesCta />
      </div>
    </div>
  );
};

export default Features;