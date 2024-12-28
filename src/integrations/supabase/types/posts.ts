export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  platform: string;
  status: PostStatus | null;
  remixed_from: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostInsert {
  id?: string;
  user_id: string;
  title: string;
  content: string;
  platform: string;
  status?: PostStatus | null;
  remixed_from?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PostUpdate {
  id?: string;
  user_id?: string;
  title?: string;
  content?: string;
  platform?: string;
  status?: PostStatus | null;
  remixed_from?: string | null;
  updated_at?: string;
}