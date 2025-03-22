import { supabase } from '@/integrations/supabase/client';

/**
 * Transcribes audio or video using OpenAI's Whisper API
 * @param fileUrl URL of the audio or video file to transcribe
 * @returns The transcription text
 */
export async function transcribeMedia(fileUrl: string): Promise<string | null> {
  try {
    // First, we need to fetch the file from the Supabase storage URL
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const fileBlob = await response.blob();
    
    // Create a FormData object to send to OpenAI
    const formData = new FormData();
    formData.append('file', fileBlob, 'recording.webm');
    formData.append('model', 'whisper-1');
    
    // Get the OpenAI API key from Supabase Edge Function
    // This is a more secure approach than storing the API key in the frontend
    const { data: functionData, error: functionError } = await supabase.functions.invoke(
      'transcribe-media',
      {
        body: { fileUrl },
      }
    );
    
    if (functionError) {
      console.error('Error invoking transcribe-media function:', functionError);
      return null;
    }
    
    if (!functionData?.transcription) {
      console.error('No transcription returned from function');
      return null;
    }
    
    return functionData.transcription;
  } catch (error) {
    console.error('Error transcribing media:', error);
    return null;
  }
}
