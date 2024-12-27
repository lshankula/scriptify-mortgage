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
      
      // Only redirect to home if onboarding is complete
      // Otherwise, if we're not already on the onboarding page, redirect there
      if (hasCompletedOnboarding) {
        console.log("User has completed onboarding, redirecting to home");
        navigate("/");
      } else {
        const currentPath = window.location.pathname;
        if (currentPath !== "/onboarding") {
          console.log("User needs to complete onboarding, redirecting to onboarding");
          navigate("/onboarding");
        } else {
          console.log("Already on onboarding page, no redirect needed");
        }
      }
    };

    if (!isLoadingSession) {
      handleRedirect();
    }
  }, [session, navigate, checkOnboardingStatus, isLoadingSession]);

  return { isLoading: isLoadingSession || isCheckingStatus };
};
