import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const auth = useAuth();

  return (
    <div className="bg-card p-6 rounded dark:bg-[#071226]">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <p className="mb-2">Welcome back, {auth.user?.name}.</p>
      <ul className="text-sm text-muted-foreground">
        <li>Member since: {auth.user?.memberSince}</li>
        <li>Last purchase: {auth.user?.lastPurchase}</li>
        <li>Total spent: ${auth.user?.totalSpent}</li>
      </ul>
    </div>
  );
}