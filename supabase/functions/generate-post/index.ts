import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, postRequirements } = await req.json();
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Fetch user's onboarding responses
    const { data: onboardingResponses, error: onboardingError } = await supabase
      .from('onboarding_responses')
      .select('question_number, text_response')
      .eq('user_id', userId)
      .order('question_number');

    if (onboardingError) throw new Error('Failed to fetch onboarding responses');

    // Create a context from onboarding responses
    const userContext = onboardingResponses.map(response => 
      `Question ${response.question_number}: ${response.text_response}`
    ).join('\n');

    // Try OpenAI first
    try {
      const completion = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are a professional content writer specializing in creating engaging social media content. 
                       Use the following information about the mortgage professional to create authentic, personalized content.
                       Their background information:
                       ${userContext}`
            },
            {
              role: 'user',
              content: `Create a social media post for ${postRequirements.platform} about: ${postRequirements.topic}
                       Style: ${postRequirements.brandVoice}
                       Key messages to include: ${postRequirements.keyMessages}
                       Call to action: ${postRequirements.callToAction}`
            }
          ],
          temperature: 0.7,
        }),
      });

      const result = await completion.json();
      return new Response(
        JSON.stringify({ content: result.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (openAIError) {
      console.error('OpenAI Error:', openAIError);
      
      // Fallback to Claude if OpenAI fails
      if (anthropicApiKey) {
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            messages: [{
              role: 'user',
              content: `Using this background information about a mortgage professional:
                       ${userContext}
                       
                       Create a social media post for ${postRequirements.platform} about: ${postRequirements.topic}
                       Style: ${postRequirements.brandVoice}
                       Key messages to include: ${postRequirements.keyMessages}
                       Call to action: ${postRequirements.callToAction}`
            }]
          }),
        });

        const claudeResult = await claudeResponse.json();
        return new Response(
          JSON.stringify({ content: claudeResult.content[0].text }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error('Both AI services failed to generate content');
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