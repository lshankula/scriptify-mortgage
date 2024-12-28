export interface OnboardingResponse {
  id: string;
  created_at: string;
  user_id: string;
  question_number: number;
  text_response: string | null;
  voice_url: string | null;
  video_url: string | null;
}

export interface OnboardingResponseInsert {
  id?: string;
  created_at?: string;
  user_id: string;
  question_number: number;
  text_response?: string | null;
  voice_url?: string | null;
  video_url?: string | null;
}

export interface OnboardingResponseUpdate {
  id?: string;
  created_at?: string;
  user_id?: string;
  question_number?: number;
  text_response?: string | null;
  voice_url?: string | null;
  video_url?: string | null;
}