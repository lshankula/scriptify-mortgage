import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { MediaRecorder } from '@/components/onboarding/MediaRecorder';
import { MediaPreview } from '@/components/onboarding/MediaPreview';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

const questions = [
  "What inspired you to get into the mortgage industry, and what keeps you motivated today?",
  "What's the most rewarding part of your job, and why does it matter so much to you?",
  "Can you share a specific story of a client you helped that had a lasting impact on you?",
  "What do you think makes your process or approach different from others in the industry?",
  "What's the biggest misconception people have about homebuying or mortgages, and how do you address it?",
  "What's one challenge clients often face, and how do you help them overcome it?",
  "Why do clients and agents trust you, and what keeps them coming back?",
  "How do you help clients who feel overwhelmed or like they won't qualify for a loan?",
  "If someone is looking to buy a home, what's the simplest first step they can take to get started?",
  "Looking back on your career, what's the one thing you hope to be remembered for?"
];

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [textResponse, setTextResponse] = useState('');
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'voice' | 'video' | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMediaRecorded = (blob: Blob, type: 'voice' | 'video') => {
    setMediaBlob(blob);
    setMediaType(type);
  };

  const uploadMedia = async (blob: Blob, type: 'voice' | 'video') => {
    const fileExt = 'webm';
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('onboarding-media')
      .upload(fileName, blob);

    if (error) {
      console.error('Error uploading media:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('onboarding-media')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async () => {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user.id) {
        throw new Error('No user session found');
      }

      let voiceUrl = null;
      let videoUrl = null;

      if (mediaBlob && mediaType) {
        const url = await uploadMedia(mediaBlob, mediaType);
        if (mediaType === 'voice') {
          voiceUrl = url;
        } else {
          videoUrl = url;
        }
      }

      const { error } = await supabase
        .from('onboarding_responses')
        .insert({
          user_id: session.data.session.user.id,
          question_number: currentQuestion + 1,
          text_response: textResponse,
          voice_url: voiceUrl,
          video_url: videoUrl,
        });

      if (error) throw error;

      // Clear form
      setTextResponse('');
      setMediaBlob(null);
      setMediaType(null);

      // Move to next question or finish
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        toast({
          title: "Onboarding Complete!",
          description: "Thank you for sharing your story with us.",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      toast({
        title: "Error",
        description: "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="space-y-6">
            <ProgressBar 
              currentQuestion={currentQuestion} 
              totalQuestions={questions.length} 
            />

            <p className="text-lg text-gray-700">{questions[currentQuestion]}</p>

            <textarea
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              className="w-full p-3 border rounded-md min-h-[120px]"
              placeholder="Type your response here..."
            />

            <MediaRecorder onMediaRecorded={handleMediaRecorded} />
            <MediaPreview mediaBlob={mediaBlob} mediaType={mediaType} />

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2"
                disabled={!textResponse && !mediaBlob}
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    Finish
                    <Send className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;