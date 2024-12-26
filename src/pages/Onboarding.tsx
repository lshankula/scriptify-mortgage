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
    question: "What is your company name?",
    type: "text",
    placeholder: "Enter your company name",
  },
  {
    id: 2,
    question: "What type of content do you typically need?",
    type: "textarea",
    placeholder: "Describe the type of content you need (e.g., blog posts, social media, email campaigns)",
  },
  {
    id: 3,
    question: "What is your target audience?",
    type: "textarea",
    placeholder: "Describe your ideal customer or target audience",
  },
  {
    id: 4,
    question: "What are your main marketing goals?",
    type: "textarea",
    placeholder: "Describe what you want to achieve with your content",
  },
];

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: existingResponses } = await supabase
        .from("onboarding_responses")
        .select("*")
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

    try {
      setIsSubmitting(true);
      
      // Save the current response
      const { error } = await supabase.from("onboarding_responses").insert({
        question_number: questions[currentQuestion].id,
        text_response: currentResponse,
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
              {currentQ.type === "textarea" ? (
                <Textarea
                  value={responses[currentQ.id] || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="min-h-[100px]"
                />
              ) : (
                <Input
                  type="text"
                  value={responses[currentQ.id] || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQ.placeholder}
                />
              )}
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