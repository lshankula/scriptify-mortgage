import { Post } from './social';

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at'>;
        Update: Partial<Omit<Post, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: {
          id: string;
          updated_at?: string;
          username?: string;
          full_name?: string;
          avatar_url?: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      onboarding_responses: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          question_number: number;
          text_response: string | null;
          voice_url: string | null;
          video_url: string | null;
        };
        Insert: Omit<Database['public']['Tables']['onboarding_responses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['onboarding_responses']['Row']>;
      };
      prompt_templates: {
        Row: {
          id: string;
          content_type: string;
          title: string;
          description: string | null;
          system_prompt: string;
          user_prompt_template: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['prompt_templates']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['prompt_templates']['Row']>;
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          tier: 'free' | 'pro' | 'enterprise' | null;
          stripe_subscription_id: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subscriptions']['Row']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      content_type: string;
      post_status: 'draft' | 'published';
      subscription_tier: 'free' | 'pro' | 'enterprise';
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];