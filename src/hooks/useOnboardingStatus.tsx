import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Match the number of basic questions in Onboarding.tsx
const TOTAL_QUESTIONS = 10;

export const useOnboardingStatus = () => {
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const { toast } = useToast();

  const checkOnboardingStatus = useCallback(async (userId: string) => {
    console.log("Starting onboarding status check for userId:", userId);
    setIsCheckingStatus(true);
    
    try {
      // First verify the session is valid
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }

      if (!session) {
        console.log("No active session found");
        return false;
      }

      console.log("Session verified, fetching onboarding responses");
      
      const { data: existingResponses, error } = await supabase
        .from("onboarding_responses")
        .select("*")
        .eq("user_id", userId);

      // Handle the case where the table doesn't exist or other database errors
      if (error) {
        console.error("Error fetching onboarding responses:", error);
        
        // If the table doesn't exist (PGRST116) or another database error occurs,
        // assume onboarding is not completed
        if (error.code === 'PGRST116' || error.code === '42P01') {
          console.log("Onboarding table doesn't exist, assuming onboarding not completed");
          return false;
        }
        
        throw error;
      }

      if (!existingResponses || existingResponses.length === 0) {
        console.log("No onboarding responses found");
        return false;
      }

      // Count unique question numbers to handle potential duplicates
      const uniqueQuestionCount = new Set(
        existingResponses.map(response => response.question_number)
      ).size;

      console.log("Onboarding responses:", existingResponses);
      console.log("Unique question count:", uniqueQuestionCount);
      
      const hasCompletedOnboarding = uniqueQuestionCount >= TOTAL_QUESTIONS;
      console.log("Has completed onboarding:", hasCompletedOnboarding, 
        "Response count:", uniqueQuestionCount,
        "Required questions:", TOTAL_QUESTIONS);

      return hasCompletedOnboarding;
    } catch (error) {
      console.error("Error in checkOnboardingStatus:", error);
      toast({
        title: "Error Checking Onboarding Status",
        description: "There was a problem checking your onboarding status",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsCheckingStatus(false);
    }
  }, [toast]);

  return { checkOnboardingStatus, isCheckingStatus };
};
