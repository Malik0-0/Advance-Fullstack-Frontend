import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkToggle from "./DarkToggle";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const { token, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 border-b sticky top-0 bg-[var(--card-bg)] z-10">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl">MovieList</Link>
        <Link to="/favorites" className="text-sm">Favorites</Link>
      </div>
      <div className="flex items-center gap-3">
        {children}
        <DarkToggle />
        {token ? (
          <button onClick={logout} className="text-sm px-3 py-1 rounded border">Logout</button>
        ) : (
          <Link to="/login" className="text-sm px-3 py-1 rounded border">Login</Link>
        )}
      </div>
    </nav>
  );
}