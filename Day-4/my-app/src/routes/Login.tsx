import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const auth = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.login(name || "Demo User", role);
    nav(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded shadow dark:bg-[#071226]">
      <h2 className="text-xl font-semibold mb-3">Login (simulated)</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary-500 text-black" />
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary-500">
            <option className="text-black" value="user">User</option>
            <option className="text-black" value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">Login</button>
        </div>
      </form>
    </div>
  );
}