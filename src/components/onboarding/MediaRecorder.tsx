import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Video } from 'lucide-react';

interface MediaRecorderProps {
  onMediaRecorded: (blob: Blob, type: 'voice' | 'video') => void;
}

export const MediaRecorder = ({ onMediaRecorded }: MediaRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mediaType, setMediaType] = useState<'voice' | 'video' | null>(null);

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
        onMediaRecorded(blob, type);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setMediaType(type);
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
  );
};