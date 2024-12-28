export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      onboarding_responses: {
        Row: OnboardingResponse;
        Insert: OnboardingResponseInsert;
        Update: OnboardingResponseUpdate;
        Relationships: [];
      };
      posts: {
        Row: Post;
        Insert: PostInsert;
        Update: PostUpdate;
        Relationships: [
          {
            foreignKeyName: "posts_remixed_from_fkey"
            columns: ["remixed_from"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ];
      };
      prompt_templates: {
        Row: PromptTemplate;
        Insert: PromptTemplateInsert;
        Update: PromptTemplateUpdate;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      content_type: ContentType;
      post_status: PostStatus;
      subscription_tier: SubscriptionTier;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];