export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export type Subscription = {
  id: string;
  user_id: string;
  tier: SubscriptionTier | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type SubscriptionInsert = {
  user_id: string;
  tier?: SubscriptionTier | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type SubscriptionUpdate = {
  tier?: SubscriptionTier | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  updated_at?: string;
};