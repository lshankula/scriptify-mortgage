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
    console.log("Loading states - Session:", isLoadingSession, "Checking status:", isCheckingStatus);
    
    const handleRedirect = async () => {
      if (!session?.user) {
        console.log("No session, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
        const currentPath = window.location.pathname;
        
        console.log("Onboarding check complete:", {
          hasCompletedOnboarding,
          currentPath,
          isLoadingSession,
          isCheckingStatus
        });

        if (hasCompletedOnboarding) {
          console.log("User has completed onboarding, redirecting to home");
          if (currentPath === "/onboarding") {
            navigate("/");
          }
        } else {
          if (currentPath !== "/onboarding") {
            console.log("User needs to complete onboarding, redirecting to onboarding");
            navigate("/onboarding");
          } else {
            console.log("Already on onboarding page, no redirect needed");
          }
        }
      } catch (error) {
        console.error("Error during redirect check:", error);
      }
    };

    // Only run redirect logic when we're not loading
    if (!isLoadingSession && !isCheckingStatus) {
      handleRedirect();
    }
  }, [session, navigate, checkOnboardingStatus, isLoadingSession, isCheckingStatus]);

  return { isLoading: isLoadingSession || isCheckingStatus };
};