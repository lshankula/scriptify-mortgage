import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { QuestionInput } from "./QuestionInput";
import { MediaControls } from "./MediaControls";
import { NavigationControls } from "./NavigationControls";

interface QuestionFormProps {
  currentQuestion: number;
  questions: Array<{
    id: number;
    question: string;
    placeholder: string;
  }>;
  onNext: () => void;
  onPrevious: () => void;
  userId: string;
}

export const QuestionForm = ({ 
  currentQuestion, 
  questions, 
  onNext, 
  onPrevious,
  userId 
}: QuestionFormProps) => {
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const currentQ = questions[currentQuestion];

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
      console.log('Saving response:', {
        question_number: questions[currentQuestion].id,
        text_response: currentResponse,
        user_id: userId
      });
      
      const { error } = await supabase
        .from("onboarding_responses")
        .upsert({
          question_number: questions[currentQuestion].id,
          text_response: currentResponse,
          user_id: userId
        }, {
          onConflict: 'user_id,question_number'
        });

      if (error) {
        console.error('Error saving response:', error);
        throw error;
      }

      onNext();
    } catch (error: any) {
      console.error("Error saving response:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <div className="space-y-6">
        <QuestionInput
          question={currentQ.question}
          placeholder={currentQ.placeholder}
          value={responses[currentQ.id] || ""}
          onChange={handleInputChange}
        />
        
        <MediaControls
          questionId={currentQ.id}
          userId={userId}
        />

        <NavigationControls
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onPrevious={onPrevious}
          onNext={handleNext}
          isSubmitting={isSubmitting}
        />
      </div>
    </Card>
  );
};