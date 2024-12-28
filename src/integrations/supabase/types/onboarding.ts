export type OnboardingResponse = {
  id: string;
  created_at: string;
  user_id: string;
  question_number: number;
  text_response: string | null;
  voice_url: string | null;
  video_url: string | null;
};

export type OnboardingResponseInsert = {
  user_id: string;
  question_number: number;
  text_response?: string | null;
  voice_url?: string | null;
  video_url?: string | null;
  created_at?: string;
};

export type OnboardingResponseUpdate = {
  question_number?: number;
  text_response?: string | null;
  voice_url?: string | null;
  video_url?: string | null;
  created_at?: string;
};