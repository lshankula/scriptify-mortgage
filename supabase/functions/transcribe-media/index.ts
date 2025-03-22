// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_supabase_function

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

interface RequestBody {
  fileUrl: string;
}

serve(async (req) => {
  // This is needed if the client doesn't include the content-type header
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Check if OpenAI API key is available
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not found");
    }

    // Parse request body
    const { fileUrl } = await req.json() as RequestBody;

    if (!fileUrl) {
      throw new Error("File URL is required");
    }

    // Fetch the file from the URL
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
    }

    const fileBlob = await fileResponse.blob();
    
    // Create a FormData object to send to OpenAI
    const formData = new FormData();
    formData.append('file', fileBlob, 'recording.webm');
    formData.append('model', 'whisper-1');

    // Send the request to OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const transcriptionData = await openaiResponse.json();

    // Return the transcription
    return new Response(
      JSON.stringify({
        transcription: transcriptionData.text,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      }
    );
  }
});
