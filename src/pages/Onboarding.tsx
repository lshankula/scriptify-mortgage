import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { QuestionForm } from "@/components/onboarding/QuestionForm";

// Define the questions for the onboarding process
const questions = [
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

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
        navigate("/dashboard");
      }
    };

    checkOnboardingStatus();
  }, [navigate]);

  if (!userId) return null;

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
        <QuestionForm
          currentQuestion={currentQuestion}
          questions={questions}
          onNext={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              navigate("/dashboard");
            }
          }}
          onPrevious={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Onboarding;