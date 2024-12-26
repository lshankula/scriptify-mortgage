import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define the questions for the onboarding process
const questions = [
  {
    id: 1,
    question: "What inspired you to get into the mortgage industry, and what keeps you motivated today?",
    type: "textarea",
    placeholder: "Share your journey and what drives you",
  },
  {
    id: 2,
    question: "What's the most rewarding part of your job, and why does it matter so much to you?",
    type: "textarea",
    placeholder: "Tell us about what makes your work meaningful",
  },
  {
    id: 3,
    question: "Can you share a specific story of a client you helped that had a lasting impact on you?",
    type: "textarea",
    placeholder: "Share a memorable experience with a client",
  },
  {
    id: 4,
    question: "What do you think makes your process or approach different from others in the industry?",
    type: "textarea",
    placeholder: "Describe what sets you apart",
  },
  {
    id: 5,
    question: "What's the biggest misconception people have about homebuying or mortgages, and how do you address it?",
    type: "textarea",
    placeholder: "Share common misconceptions and your approach to addressing them",
  },
  {
    id: 6,
    question: "What's one challenge clients often face, and how do you help them overcome it?",
    type: "textarea",
    placeholder: "Describe a common challenge and your solution",
  },
  {
    id: 7,
    question: "Why do clients and agents trust you, and what keeps them coming back?",
    type: "textarea",
    placeholder: "Share what builds trust with your clients",
  },
  {
    id: 8,
    question: "How do you help clients who feel overwhelmed or like they won't qualify for a loan?",
    type: "textarea",
    placeholder: "Describe how you support challenging situations",
  },
  {
    id: 9,
    question: "If someone is looking to buy a home, what's the simplest first step they can take to get started?",
    type: "textarea",
    placeholder: "Share your advice for getting started",
  },
  {
    id: 10,
    question: "Looking back on your career, what's the one thing you hope to be remembered for?",
    type: "textarea",
    placeholder: "Share your legacy and impact",
  },
];

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        navigate("/login");
        return;
      }
      
      setUserId(session.user.id);

      const { data: existingResponses } = await supabase
        .from("onboarding_responses")
        .select("*")
        .eq("user_id", session.user.id)
        .order("question_number");

      if (existingResponses && existingResponses.length > 0) {
        navigate("/");
      }
    };

    checkOnboardingStatus();
  }, [navigate]);

  const handleInputChange = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleNext = async () => {
    const currentResponse = responses[questions[currentQuestion].id];
    
    if (!currentResponse?.trim()) {
      toast({
        title: "Required Field",
        description: "Please provide an answer before continuing",
        variant: "destructive",
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Error",
        description: "User session not found. Please try logging in again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Save the current response
      const { error } = await supabase.from("onboarding_responses").insert({
        question_number: questions[currentQuestion].id,
        text_response: currentResponse,
        user_id: userId
      });

      if (error) throw error;

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        toast({
          title: "Onboarding Complete",
          description: "Thank you for completing the onboarding process!",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving response:", error);
      toast({
        title: "Error",
        description: "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to MortgageContent.ai
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get to know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentQ.question}
              </h3>
              <Textarea
                value={responses[currentQ.id] || ""}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQ.placeholder}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0 || isSubmitting}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
              >
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500 text-center">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;