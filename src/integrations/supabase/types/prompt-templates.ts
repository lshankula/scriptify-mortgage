export type ContentType =
  | 'facebook_long'
  | 'facebook_short'
  | 'linkedin_article'
  | 'linkedin_post'
  | 'video_short'
  | 'video_long'
  | 'instagram_post'
  | 'instagram_reel'
  | 'twitter_post'
  | 'email_newsletter'
  | 'email_drip'
  | 'blog_post'
  | 'blog_article';

export interface PromptTemplate {
  id: string;
  content_type: ContentType;
  title: string;
  description: string | null;
  system_prompt: string;
  user_prompt_template: string;
  created_at: string;
  updated_at: string;
}

export interface PromptTemplateInsert {
  id?: string;
  content_type: ContentType;
  title: string;
  description?: string | null;
  system_prompt: string;
  user_prompt_template: string;
  created_at?: string;
  updated_at?: string;
}

export interface PromptTemplateUpdate {
  id?: string;
  content_type?: ContentType;
  title?: string;
  description?: string | null;
  system_prompt?: string;
  user_prompt_template?: string;
  updated_at?: string;
}