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
      
      // Allow access to public pages when not logged in
      if (!session?.user) {
        console.log("No session, checking if on protected page");
        // If not on a public page, redirect to login
        if (!['/login', '/signup', '/', '/features', '/pricing'].includes(currentPath)) {
          console.log("Not on public page, redirecting to login");
          navigate("/login");
        }
        return;
      }

      setIsRedirecting(true);

      try {
        // If user is authenticated and on login/signup pages, redirect to dashboard
        if (['/login', '/signup'].includes(currentPath)) {
          console.log("Auth complete, redirecting to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during redirect check:", error);
      } finally {
        setIsRedirecting(false);
      }
    };

    handleRedirect();
  }, [session, navigate, isLoadingSession, isCheckingStatus, isRedirecting]);

  return { isLoading: isLoadingSession || isCheckingStatus };
};