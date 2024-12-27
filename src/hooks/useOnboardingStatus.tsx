import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TOTAL_QUESTIONS = 10;

export const useOnboardingStatus = () => {
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const { toast } = useToast();

  const checkOnboardingStatus = useCallback(async (userId: string) => {
    console.log("Checking onboarding status for userId:", userId);
    setIsCheckingStatus(true);
    
    try {
      const { data: existingResponses, error } = await supabase
        .from("onboarding_responses")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error checking onboarding status:", error);
        throw error;
      }

      // Count unique question numbers to handle potential duplicates
      const uniqueQuestionCount = new Set(
        existingResponses?.map(response => response.question_number)
      ).size;

      console.log("Onboarding responses:", existingResponses);
      console.log("Unique question count:", uniqueQuestionCount);
      
      const hasCompletedOnboarding = uniqueQuestionCount === TOTAL_QUESTIONS;
      console.log("Has completed onboarding:", hasCompletedOnboarding, 
        "Response count:", uniqueQuestionCount,
        "Required questions:", TOTAL_QUESTIONS);

      return hasCompletedOnboarding;
    } catch (error) {
      console.error("Error in checkOnboardingStatus:", error);
      toast({
        title: "Error",
        description: "Failed to check onboarding status",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsCheckingStatus(false);
    }
  }, [toast]);

  return { checkOnboardingStatus, isCheckingStatus };
};