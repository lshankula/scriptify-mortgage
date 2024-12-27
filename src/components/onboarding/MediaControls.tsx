import { MediaRecorder } from "./MediaRecorder";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MediaControlsProps {
  questionId: number;
  userId: string;
}

export const MediaControls = ({ questionId, userId }: MediaControlsProps) => {
  const { toast } = useToast();

  const handleMediaUpload = async (file: File, type: 'video' | 'voice') => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${questionId}/${type}_${Date.now()}.${fileExt}`;
      
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

  const handleRecordingComplete = async (blob: Blob, type: 'video' | 'voice') => {
    const file = new File([blob], `${type}_${Date.now()}.webm`, { type: blob.type });
    const url = await handleMediaUpload(file, type);
    if (url) {
      try {
        const { error } = await supabase
          .from("onboarding_responses")
          .upsert({
            question_number: questionId,
            user_id: userId,
            [type === 'voice' ? 'voice_url' : 'video_url']: url
          }, {
            onConflict: 'user_id,question_number'
          });
        
        if (error) throw error;
        
        toast({
          title: `${type === 'voice' ? 'Voice Note' : 'Video'} Saved`,
          description: `Your ${type} has been uploaded successfully.`,
        });
      } catch (error: any) {
        console.error(`Error saving ${type}:`, error);
        toast({
          title: "Error",
          description: error.message || `Failed to save ${type}. Please try again.`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      <MediaRecorder
        onRecordingComplete={(blob) => handleRecordingComplete(blob, 'voice')}
        type="voice"
      />
      <MediaRecorder
        onRecordingComplete={(blob) => handleRecordingComplete(blob, 'video')}
        type="video"
      />
    </div>
  );
};