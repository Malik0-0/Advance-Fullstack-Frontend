export type UserRole = "guest" | "user" | "admin";

export type User = {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  gender?: "male" | "female" | "other";
  memberSince?: string;
  lastPurchase?: string;
  lifetimeValue?: number;
};