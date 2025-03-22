import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Video, Square, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  type: 'voice' | 'video';
  disabled?: boolean;
}

export const MediaRecorder = ({ onRecordingComplete, type, disabled = false }: MediaRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  // Check if MediaRecorder is supported
  useEffect(() => {
    const checkSupport = async () => {
      try {
        // Check if MediaRecorder exists
        if (!window.MediaRecorder) {
          setIsSupported(false);
          return;
        }

        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setIsSupported(false);
          return;
        }

        // Try to get permissions to verify support
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: type === 'video',
        });
        
        // Release the stream immediately
        stream.getTracks().forEach(track => track.stop());
        
        setIsSupported(true);
      } catch (error) {
        console.error('Media devices not supported:', error);
        setIsSupported(false);
      }
    };

    checkSupport();
  }, [type]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video',
      });

      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (chunksRef.current.length === 0) {
          toast({
            title: "Recording Error",
            description: "No data was recorded. Please try again.",
            variant: "destructive",
          });
          return;
        }

        const blob = new Blob(chunksRef.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm',
        });
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        toast({
          title: "Recording Error",
          description: "An error occurred while recording. Please try again.",
          variant: "destructive",
        });
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Permission Error",
        description: "Could not access your camera or microphone. Please check your browser permissions.",
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

  if (!isSupported) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className="flex items-center gap-2 opacity-70"
      >
        <AlertCircle className="h-4 w-4" />
        {type === 'video' ? 'Video not supported' : 'Audio not supported'}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={isRecording ? "destructive" : "secondary"}
      onClick={isRecording ? stopRecording : startRecording}
      className="flex items-center gap-2"
      disabled={disabled}
    >
      {isRecording ? (
        <>
          <Square className="h-4 w-4" />
          Stop {type === 'video' ? 'Video' : 'Recording'}
        </>
      ) : (
        <>
          {type === 'video' ? <Video className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {type === 'video' ? 'Record Video' : 'Voice Note'}
        </>
      )}
    </Button>
  );
};
