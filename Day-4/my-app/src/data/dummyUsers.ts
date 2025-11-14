export type AdminUser = {
  id: string;
  name: string;
  gender: "male" | "female";
  memberSince: string;
  lastPurchase: string;
  totalSpent: number;
};

export const dummyUsers: AdminUser[] = [
  { id: "u1", name: "Alice", gender: "female", memberSince: "2021-04-12", lastPurchase: "2025-10-12", totalSpent: 420 },
  { id: "u2", name: "Bob", gender: "male", memberSince: "2022-08-01", lastPurchase: "2025-11-01", totalSpent: 120 },
  { id: "u3", name: "Citra", gender: "female", memberSince: "2023-01-23", lastPurchase: "2025-09-10", totalSpent: 980 },
  { id: "u4", name: "Dedi", gender: "male", memberSince: "2020-05-03", lastPurchase: "2025-10-31", totalSpent: 230 },
  { id: "u5", name: "Eko", gender: "male", memberSince: "2019-12-12", lastPurchase: "2025-06-20", totalSpent: 30 },
];