export type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  platform: string;
  status: PostStatus | null;
  remixed_from: string | null;
  created_at: string;
  updated_at: string;
};

export type PostStatus = 'draft' | 'published';

export type PostInsert = {
  user_id: string;
  title: string;
  content: string;
  platform: string;
  status?: PostStatus | null;
  remixed_from?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PostUpdate = {
  title?: string;
  content?: string;
  platform?: string;
  status?: PostStatus | null;
  remixed_from?: string | null;
  updated_at?: string;
};