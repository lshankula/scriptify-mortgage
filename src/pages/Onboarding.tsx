import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mic, Video, Send, ArrowRight, ArrowLeft } from 'lucide-react';

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
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'voice' | 'video' | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startRecording = async (type: 'voice' | 'video') => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video',
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {
          type: type === 'video' ? 'video/webm' : 'audio/webm',
        });
        setMediaBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setMediaType(type);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Error",
        description: "Could not access your microphone/camera. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadMedia = async (blob: Blob, type: 'voice' | 'video') => {
    const fileExt = type === 'video' ? 'webm' : 'webm';
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
        navigate('/dashboard');
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <div className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            <p className="text-lg text-gray-700">{questions[currentQuestion]}</p>

            <textarea
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              className="w-full p-3 border rounded-md min-h-[120px]"
              placeholder="Type your response here..."
            />

            <div className="flex gap-4">
              {!isRecording ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => startRecording('voice')}
                    className="flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    Record Voice
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => startRecording('video')}
                    className="flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Record Video
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                  className="flex items-center gap-2"
                >
                  Stop Recording
                </Button>
              )}
            </div>

            {mediaBlob && (
              <div className="mt-4">
                {mediaType === 'video' ? (
                  <video src={URL.createObjectURL(mediaBlob)} controls className="w-full" />
                ) : (
                  <audio src={URL.createObjectURL(mediaBlob)} controls className="w-full" />
                )}
              </div>
            )}

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