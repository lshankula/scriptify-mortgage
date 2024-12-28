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

export interface SubscriptionInsert extends Omit<Subscription, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubscriptionUpdate extends Partial<SubscriptionInsert> {
  id?: string;
}