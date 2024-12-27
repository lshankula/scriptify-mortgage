import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MediaRecorder } from "./MediaRecorder";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResponseInputProps {
  currentQ: {
    id: number;
    question: string;
    placeholder: string;
  };
  userId: string;
  onResponseChange: (value: string) => void;
  value: string;
}

export const ResponseInput = ({ currentQ, userId, onResponseChange, value }: ResponseInputProps) => {
  const { toast } = useToast();

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

  const handleMediaSave = async (url: string | null, type: 'video' | 'voice') => {
    if (!url) return;
    
    try {
      const { error } = await supabase
        .from("onboarding_responses")
        .upsert({
          question_number: currentQ.id,
          user_id: userId,
          [type === 'video' ? 'video_url' : 'voice_url']: url
        }, {
          onConflict: 'user_id,question_number'
        });
      
      if (error) throw error;
      
      toast({
        title: `${type === 'video' ? 'Video' : 'Voice Note'} Saved`,
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
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {currentQ.question}
      </h3>
      <Textarea
        value={value}
        onChange={(e) => onResponseChange(e.target.value)}
        placeholder={currentQ.placeholder}
        className="min-h-[100px] mb-4"
      />
      <div className="flex gap-4 mb-4">
        <MediaRecorder
          onRecordingComplete={async (blob) => {
            const file = new File([blob], `voice_${Date.now()}.webm`, { type: blob.type });
            const url = await handleMediaUpload(file, 'voice');
            if (url) await handleMediaSave(url, 'voice');
          }}
          type="voice"
        />
        <MediaRecorder
          onRecordingComplete={async (blob) => {
            const file = new File([blob], `video_${Date.now()}.webm`, { type: blob.type });
            const url = await handleMediaUpload(file, 'video');
            if (url) await handleMediaSave(url, 'video');
          }}
          type="video"
        />
      </div>
    </div>
  );
};