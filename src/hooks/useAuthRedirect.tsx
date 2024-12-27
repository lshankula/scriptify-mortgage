import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "./useSession";
import { useOnboardingStatus } from "./useOnboardingStatus";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { session, isLoading: isLoadingSession } = useSession();
  const { checkOnboardingStatus, isCheckingStatus } = useOnboardingStatus();

  useEffect(() => {
    console.log("Auth redirect effect running, session:", session?.user?.email);
    
    const handleRedirect = async () => {
      if (!session?.user) {
        console.log("No session, no redirect needed");
        return;
      }

      const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
      
      if (hasCompletedOnboarding) {
        console.log("User has completed onboarding, redirecting to home");
        navigate("/");
      } else {
        console.log("User needs to complete onboarding, redirecting to onboarding");
        navigate("/onboarding");
      }
    };

    handleRedirect();
  }, [session, navigate, checkOnboardingStatus]);

  return { isLoading: isLoadingSession || isCheckingStatus };
};