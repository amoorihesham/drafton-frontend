export type Subscription = {
  id: string;
  status: SubscriptionStatus;
  current_period_start: Date;
  current_period_end: Date;
  trial_ends_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type SubscriptionStatus = "trialing" | "active" | "canceled" | "expired" | "past_due";
