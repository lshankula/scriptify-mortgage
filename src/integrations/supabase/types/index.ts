import type { Post, PostStatus, PostInsert, PostUpdate } from './posts';
import type { Subscription, SubscriptionTier, SubscriptionInsert, SubscriptionUpdate } from './subscriptions';
import type { OnboardingResponse, OnboardingResponseInsert, OnboardingResponseUpdate } from './onboarding';

export type Database = {
  public: {
    Tables: {
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
        ]
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
        Relationships: []
      };
      onboarding_responses: {
        Row: OnboardingResponse;
        Insert: OnboardingResponseInsert;
        Update: OnboardingResponseUpdate;
        Relationships: []
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      post_status: PostStatus;
      subscription_tier: SubscriptionTier;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type {
  Post,
  PostStatus,
  PostInsert,
  PostUpdate,
  Subscription,
  SubscriptionTier,
  SubscriptionInsert,
  SubscriptionUpdate,
  OnboardingResponse,
  OnboardingResponseInsert,
  OnboardingResponseUpdate,
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;