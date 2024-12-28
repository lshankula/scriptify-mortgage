import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { supabase } from "@/integrations/supabase/client";

export const OnboardingButton = () => {
  const [showButton, setShowButton] = useState(false);
  const { checkOnboardingStatus } = useOnboardingStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.log("No active session found in OnboardingButton");
        setShowButton(false);
        return;
      }

      console.log("Checking onboarding status for user:", session.user.id);
      try {
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
        setShowButton(!hasCompletedOnboarding);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setShowButton(false);
      }
    };

    checkStatus();
  }, [checkOnboardingStatus]);

  if (!showButton) return null;

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => navigate('/onboarding')}
    >
      <ClipboardList className="w-4 h-4" />
      Complete Onboarding
    </Button>
  );
};