export interface OnboardingResponse {
  id: string;
  created_at: string;
  user_id: string;
  question_number: number;
  text_response: string | null;
  voice_url: string | null;
  video_url: string | null;
}

export interface OnboardingResponseInsert extends Omit<OnboardingResponse, 'id' | 'created_at'> {
  id?: string;
  created_at?: string;
}

export interface OnboardingResponseUpdate extends Partial<OnboardingResponseInsert> {
  id?: string;
}