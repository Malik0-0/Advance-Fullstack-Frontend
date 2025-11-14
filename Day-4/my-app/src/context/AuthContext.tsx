import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "guest" | "user" | "admin";

type User = {
  name: string;
  role: Role;
  memberSince: string;
  lastPurchase?: string;
  totalSpent?: number;
  gender?: "male" | "female" | "other";
};

type AuthState = {
  user: User | null;
  token: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (name: string, role?: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setThemeDark: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "app_auth_v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { user: null, token: null };
      return JSON.parse(raw) as AuthState;
    } catch {
      return { user: null, token: null };
    }
  });

  useEffect(() => {
    if (state.token) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    else localStorage.removeItem(STORAGE_KEY);
  }, [state]);

  const login = (name: string, role: Role = "user") => {
    const fakeUser: User = {
      name,
      role,
      memberSince: new Date(+(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3))).toISOString().slice(0, 10),
      lastPurchase: new Date(+(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90))).toISOString().slice(0, 10),
      totalSpent: Math.floor(Math.random() * 1000),
      gender: Math.random() > 0.5 ? "male" : "female"
    };
    setState({ user: fakeUser, token: "fake-jwt-token" });
  };

  const logout = () => setState({ user: null, token: null });

  const setThemeDark = (v: boolean) => {
    if (v) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    login,
    logout,
    isAuthenticated: Boolean(state.token),
    setThemeDark
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};