import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const token = btoa(name || "guest");
    login(token);
    nav("/favorites");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl mb-4">Login (simulate)</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="border px-3 py-2 rounded text-black" />
        <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">Login</button>
      </form>
    </div>
  );
}