import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "./useSession";
import { useOnboardingStatus } from "./useOnboardingStatus";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { session, isLoading: isLoadingSession } = useSession();
  const { checkOnboardingStatus, isCheckingStatus } = useOnboardingStatus();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("Auth redirect effect running", {
      session: session?.user?.email,
      isLoadingSession,
      isCheckingStatus,
      isRedirecting,
      currentPath: window.location.pathname
    });
    
    const handleRedirect = async () => {
      // Prevent multiple redirects from running simultaneously
      if (isRedirecting) {
        console.log("Already redirecting, skipping");
        return;
      }

      // Don't redirect if we're still loading
      if (isLoadingSession || isCheckingStatus) {
        console.log("Still loading, skipping redirect");
        return;
      }

      const currentPath = window.location.pathname;
      
      // Allow access to auth-related pages when not logged in
      if (!session?.user) {
        console.log("No session, checking if on auth page");
        // If not on an auth page, redirect to login
        if (!['/login', '/signup', '/'].includes(currentPath)) {
          console.log("Not on auth page, redirecting to login");
          navigate("/login");
        }
        return;
      }

      setIsRedirecting(true);

      try {
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);

        console.log("Redirect check:", {
          hasCompletedOnboarding,
          currentPath,
          userId: session.user.id
        });

        // Handle redirects based on onboarding status
        if (hasCompletedOnboarding) {
          if (['/login', '/signup', '/onboarding'].includes(currentPath)) {
            console.log("Auth complete, redirecting to home");
            navigate("/");
          }
        } else {
          if (currentPath !== "/onboarding" && !['/login', '/signup'].includes(currentPath)) {
            console.log("Onboarding incomplete, redirecting to onboarding");
            navigate("/onboarding");
          } else {
            console.log("On appropriate page, no redirect needed");
          }
        }
      } catch (error) {
        console.error("Error during redirect check:", error);
      } finally {
        setIsRedirecting(false);
      }
    };

    handleRedirect();
  }, [session, navigate, checkOnboardingStatus, isLoadingSession, isCheckingStatus, isRedirecting]);

  return { isLoading: isLoadingSession || isCheckingStatus };
};