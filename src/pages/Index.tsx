import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { OnboardingCenter } from "@/components/onboarding/OnboardingCenter";
import { OnboardingDialog } from "@/components/onboarding/OnboardingDialog";

const Index = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background pt-16">
      <OnboardingCenter />
      <OnboardingDialog />
    </div>
  );
};

export default Index;