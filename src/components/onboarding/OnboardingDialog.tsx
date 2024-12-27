import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { supabase } from "@/integrations/supabase/client";

export const OnboardingDialog = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { checkOnboardingStatus } = useOnboardingStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
        setOpen(!hasCompletedOnboarding);
      }
    };

    checkStatus();
  }, [checkOnboardingStatus]);

  const handleStartOnboarding = () => {
    setOpen(false);
    navigate('/onboarding');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to MortgageContent.ai!</DialogTitle>
          <DialogDescription>
            Let's get to know you better so we can personalize your experience. Take a few minutes to complete our onboarding questions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Later
          </Button>
          <Button onClick={handleStartOnboarding}>
            Start Onboarding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};