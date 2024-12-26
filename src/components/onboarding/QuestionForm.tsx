import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MediaRecorder } from "@/components/onboarding/MediaRecorder";

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

  const handleMediaUpload = async (file: File, type: 'video' | 'voice') => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${currentQ.id}/${type}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('onboarding-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('onboarding-media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload media file. Please try again.",
        variant: "destructive",
      });
      return null;
    }
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
      
      const { error } = await supabase.from("onboarding_responses").insert({
        question_number: questions[currentQuestion].id,
        text_response: currentResponse,
        user_id: userId
      });

      if (error) throw error;

      onNext();
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

  return (
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
            className="min-h-[100px] mb-4"
          />
          <div className="flex gap-4 mb-4">
            <MediaRecorder
              onRecordingComplete={async (blob) => {
                const file = new File([blob], `voice_${Date.now()}.webm`, { type: blob.type });
                const url = await handleMediaUpload(file, 'voice');
                if (url) {
                  await supabase.from("onboarding_responses")
                    .upsert({
                      question_number: currentQ.id,
                      user_id: userId,
                      voice_url: url
                    });
                  toast({
                    title: "Voice Note Saved",
                    description: "Your voice note has been uploaded successfully.",
                  });
                }
              }}
              type="voice"
            />
            <MediaRecorder
              onRecordingComplete={async (blob) => {
                const file = new File([blob], `video_${Date.now()}.webm`, { type: blob.type });
                const url = await handleMediaUpload(file, 'video');
                if (url) {
                  await supabase.from("onboarding_responses")
                    .upsert({
                      question_number: currentQ.id,
                      user_id: userId,
                      video_url: url
                    });
                  toast({
                    title: "Video Saved",
                    description: "Your video has been uploaded successfully.",
                  });
                }
              }}
              type="video"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
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
  );
};