import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, postRequirements } = await req.json();
    
    if (!userId || !postRequirements) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generating post with requirements:', postRequirements);

    const prompt = `
      Create a social media post with the following requirements:
      Topic: ${postRequirements.topic}
      Brand Voice: ${postRequirements.brandVoice}
      Key Messages: ${postRequirements.keyMessages}
      Call to Action: ${postRequirements.callToAction}
      
      Please write a compelling and engaging post that incorporates all these elements.
    `;

    const systemPrompt = `
      You are a professional social media content creator.
      Create content that is engaging, authentic, and aligned with the brand voice.
      Focus on clarity and impact while maintaining a conversational tone.
      Include the key messages naturally within the content.
      End with a clear call to action.
      Keep hashtags minimal and relevant.
    `.split('\n').map(line => line.trim()).filter(Boolean).join('\n');

    console.log('Attempting OpenAI request');
    try {
      const completion = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!completion.ok) {
        throw new Error(`OpenAI API error: ${completion.statusText}`);
      }

      const result = await completion.json();
      console.log('OpenAI response received');
      
      return new Response(
        JSON.stringify({ content: result.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('OpenAI error:', error);
      console.log('Falling back to Claude');

      try {
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1024,
            messages: [
              {
                role: 'system',
                content: systemPrompt,
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
          }),
        });

        if (!claudeResponse.ok) {
          throw new Error(`Claude API error: ${claudeResponse.statusText}`);
        }

        const claudeResult = await claudeResponse.json();
        console.log('Claude response received');
        
        return new Response(
          JSON.stringify({ content: claudeResult.content[0].text }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (claudeError) {
        console.error('Claude error:', claudeError);
        throw new Error('Both OpenAI and Claude failed to generate content');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});