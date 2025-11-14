import { dummyUsers } from "../data/dummyUsers";

export default function Admin() {
  const total = dummyUsers.length;
  const female = dummyUsers.filter((u) => u.gender === "female").length;
  const male = dummyUsers.filter((u) => u.gender === "male").length;
  const femalePct = Math.round((female / total) * 100);
  const malePct = Math.round((male / total) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded dark:bg-[#071226]">
          <h3 className="text-sm text-muted-foreground">Total users</h3>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="bg-card p-4 rounded dark:bg-[#071226]">
          <h3 className="text-sm text-muted-foreground">Female</h3>
          <div className="text-2xl font-bold">{femalePct}%</div>
        </div>
        <div className="bg-card p-4 rounded dark:bg-[#071226]">
          <h3 className="text-sm text-muted-foreground">Male</h3>
          <div className="text-2xl font-bold">{malePct}%</div>
        </div>
      </div>

      <div className="bg-card p-4 rounded dark:bg-[#071226]">
        <h3 className="font-semibold mb-3">Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-2">Name</th>
                <th className="pb-2">Gender</th>
                <th className="pb-2">Member since</th>
                <th className="pb-2">Last purchase</th>
                <th className="pb-2">Total spent</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((u) => (
                <tr key={u.id} className="border-t dark:border-[#0a1b2b]">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.gender}</td>
                  <td className="py-2">{u.memberSince}</td>
                  <td className="py-2">{u.lastPurchase}</td>
                  <td className="py-2">${u.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}