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

export type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type PostUpdate = Partial<PostInsert> & {
  id?: string;
};