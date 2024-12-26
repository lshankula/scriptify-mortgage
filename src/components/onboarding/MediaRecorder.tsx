import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Video, Square } from "lucide-react";

interface MediaRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  type: 'voice' | 'video';
}

export const MediaRecorder = ({ onRecordingComplete, type }: MediaRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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
        const blob = new Blob(chunksRef.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm',
        });
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Button
      type="button"
      variant={isRecording ? "destructive" : "secondary"}
      onClick={isRecording ? stopRecording : startRecording}
      className="flex items-center gap-2"
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