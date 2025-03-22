import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { supabase } from "@/integrations/supabase/client";

export const OnboardingButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { checkOnboardingStatus } = useOnboardingStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          console.log("No active session found in OnboardingButton");
          setShowButton(false);
          return;
        }

        console.log("Checking onboarding status for user:", session.user.id);
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
        setShowButton(!hasCompletedOnboarding);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        // Show the button if there's an error, so users can complete onboarding
        setShowButton(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [checkOnboardingStatus]);

  if (isLoading || !showButton) return null;

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
