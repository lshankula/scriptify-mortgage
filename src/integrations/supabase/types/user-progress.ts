// Types for user progress and gamification

export interface UserProgress {
  id: string;
  user_id: string;
  xp_total: number;
  level: number;
  xp_to_next_level: number;
  created_at: string;
  updated_at: string;
}

export interface UserProgressInsert {
  user_id: string;
  xp_total: number;
  level: number;
  xp_to_next_level: number;
  created_at?: string;
  updated_at?: string;
}

export interface UserProgressUpdate {
  user_id?: string;
  xp_total?: number;
  level?: number;
  xp_to_next_level?: number;
  updated_at?: string;
}
