export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInsert {
  id?: string;
  user_id: string;
  tier?: SubscriptionTier | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SubscriptionUpdate {
  id?: string;
  user_id?: string;
  tier?: SubscriptionTier | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  updated_at?: string;
}