export type Plan = {
  id: string;
  name: "free" | "pro" | "ultimate";
  price_monthly: number;
  price_yearly: number;
  max_documents_per_day: number;
  features: Record<string, boolean>;
  is_active: boolean;
};
