import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignedInUser = async (userId: string) => {
    console.log("Starting handleSignedInUser for userId:", userId);
    try {
      const { data: existingResponses, error } = await supabase
        .from("onboarding_responses")
        .select("*")
        .eq("user_id", userId)
        .limit(1);

      if (error) {
        console.error("Error checking onboarding status:", error);
        throw error;
      }

      console.log("Onboarding responses:", existingResponses);

      if (existingResponses && existingResponses.length > 0) {
        console.log("User has completed onboarding, redirecting to home");
        navigate("/");
      } else {
        console.log("User needs to complete onboarding, redirecting to onboarding");
        navigate("/onboarding");
      }
    } catch (error) {
      console.error("Error in handleSignedInUser:", error);
      toast({
        title: "Error",
        description: "Failed to check onboarding status",
        variant: "destructive",
      });
    } finally {
      console.log("Finishing handleSignedInUser, setting isLoading to false");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Login component mounted");
    let mounted = true;
    
    const checkSession = async () => {
      if (!mounted) return;
      
      try {
        console.log("Starting checkSession");
        setIsLoading(true);
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          throw error;
        }
        
        console.log("Session check result:", session?.user?.email);
        
        if (session?.user) {
          console.log("Active session found, handling signed in user");
          await handleSignedInUser(session.user.id);
        } else {
          console.log("No active session found, ready for login");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
        if (mounted) {
          toast({
            title: "Error",
            description: "Failed to check authentication status",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      }
    };

    // Run initial session check
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) {
        console.log("Component unmounted, skipping auth state change");
        return;
      }
      
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === "SIGNED_IN" && session?.user) {
        console.log("Sign in event detected, handling signed in user");
        setIsLoading(true);
        await handleSignedInUser(session.user.id);
      } else if (event === "SIGNED_OUT") {
        console.log("Sign out event detected");
        navigate("/login");
      }
    });

    return () => {
      console.log("Login component unmounting, cleaning up");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return { isLoading };
};