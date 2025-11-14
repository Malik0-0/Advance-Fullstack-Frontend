import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactElement;
  role?: "user" | "admin";
};

export default function RequireAuth({ children, role }: Props) {
  const auth = useAuth();
  const loc = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }

  if (role && auth.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}