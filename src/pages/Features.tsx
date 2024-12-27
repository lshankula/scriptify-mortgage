import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { HeroFeatures } from "@/components/features/HeroFeatures";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { BenefitsList } from "@/components/features/BenefitsList";
import { FeaturesCta } from "@/components/features/FeaturesCta";

const Features = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroFeatures />
        <FeatureGrid />
        <BenefitsList />
        <FeaturesCta />
      </div>
    </DashboardLayout>
  );
};

export default Features;