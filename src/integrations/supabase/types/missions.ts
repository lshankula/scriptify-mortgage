export type MissionStatus = 'not_started' | 'in_progress' | 'completed';

export interface Mission {
  id: string;
  user_id: string;
  title: string;
  description: string;
  xp_reward: number;
  status: MissionStatus;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  mission_type: 'daily' | 'weekly' | 'achievement';
}

export interface MissionInsert {
  id?: string;
  user_id: string;
  title: string;
  description: string;
  xp_reward: number;
  status?: MissionStatus;
  created_at?: string;
  updated_at?: string;
  expires_at?: string | null;
  mission_type?: 'daily' | 'weekly' | 'achievement';
}

export interface MissionUpdate {
  id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  xp_reward?: number;
  status?: MissionStatus;
  created_at?: string;
  updated_at?: string;
  expires_at?: string | null;
  mission_type?: 'daily' | 'weekly' | 'achievement';
}
