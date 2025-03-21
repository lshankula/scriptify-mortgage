import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { QuestionForm } from "@/components/onboarding/QuestionForm";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

const basicQuestions = [
  {
    id: 1,
    question: "What inspired you to get into the mortgage industry, and what keeps you motivated today?",
    placeholder: "Share your journey and what drives you",
  },
  {
    id: 2,
    question: "What's the most rewarding part of your job, and why does it matter so much to you?",
    placeholder: "Tell us about what makes your work meaningful",
  },
  {
    id: 3,
    question: "Can you share a specific story of a client you helped that had a lasting impact on you?",
    placeholder: "Share a memorable experience with a client",
  },
  {
    id: 4,
    question: "What do you think makes your process or approach different from others in the industry?",
    placeholder: "Describe what sets you apart",
  },
  {
    id: 5,
    question: "What's the biggest misconception people have about homebuying or mortgages, and how do you address it?",
    placeholder: "Share common misconceptions and your approach to addressing them",
  },
  {
    id: 6,
    question: "What's one challenge clients often face, and how do you help them overcome it?",
    placeholder: "Describe a common challenge and your solution",
  },
  {
    id: 7,
    question: "Why do clients and agents trust you, and what keeps them coming back?",
    placeholder: "Share what builds trust with your clients",
  },
  {
    id: 8,
    question: "How do you help clients who feel overwhelmed or like they won't qualify for a loan?",
    placeholder: "Describe how you support challenging situations",
  },
  {
    id: 9,
    question: "If someone is looking to buy a home, what's the simplest first step they can take to get started?",
    placeholder: "Share your advice for getting started",
  },
  {
    id: 10,
    question: "Looking back on your career, what's the one thing you hope to be remembered for?",
    placeholder: "Share your legacy and impact",
  },
];

const advancedQuestions = [
  {
    id: 11,
    question: "What specific marketing strategies have been most effective for you in the past?",
    placeholder: "Share your successful marketing approaches",
  },
  {
    id: 12,
    question: "How do you typically structure your follow-up process with clients?",
    placeholder: "Describe your follow-up methodology",
  },
  {
    id: 13,
    question: "What tools or technologies do you currently use in your mortgage business?",
    placeholder: "List the tools and technologies you rely on",
  },
  {
    id: 14,
    question: "How do you handle objections from potential clients?",
    placeholder: "Share your approach to handling objections",
  },
  {
    id: 15,
    question: "What's your preferred method for generating new leads?",
    placeholder: "Describe your lead generation strategy",
  }
];

type OnboardingMode = 'basic' | 'edit' | 'advanced';

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get('mode') || 'basic') as OnboardingMode;
  const { toast } = useToast();
  const [existingResponses, setExistingResponses] = useState<any[]>([]);

  const questions = mode === 'advanced' ? advancedQuestions : basicQuestions;

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        navigate("/login");
        return;
      }
      
      setUserId(session.user.id);

      const { data: responses } = await supabase
        .from("onboarding_responses")
        .select("*")
        .eq("user_id", session.user.id)
        .order("question_number");

      if (responses) {
        setExistingResponses(responses);
        
        // Count unique question numbers to handle potential duplicates
        const uniqueQuestionCount = new Set(
          responses?.map(response => response.question_number)
        ).size;
        
        // Only redirect if all basic questions have been answered
        if (mode !== 'edit' && mode !== 'advanced' && uniqueQuestionCount === basicQuestions.length) {
          toast({
            title: "Onboarding Already Completed",
            description: "You can edit your responses or take the advanced training.",
          });
          navigate("/learning");
        }
      }
    };

    checkOnboardingStatus();
  }, [navigate, mode, toast]);

  if (!userId) return null;

  return (
    <DashboardLayout>
      <div className="bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {mode === 'advanced' ? 'Advanced Training' : 
             mode === 'edit' ? 'Edit Your Responses' : 
             'Welcome to MortgageContent.ai'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 mb-6">
            {mode === 'advanced' ? 'Let\'s dive deeper into your expertise' :
             mode === 'edit' ? 'Update your previous responses' :
             'Let\'s get to know you better'}
          </p>

          {(mode === 'edit' || mode === 'advanced') && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Note: New answers will override your previous responses for each question.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <QuestionForm
            currentQuestion={currentQuestion}
            questions={questions}
            onNext={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
              } else {
                navigate("/learning");
              }
            }}
            onPrevious={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            userId={userId}
            mode={mode}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
