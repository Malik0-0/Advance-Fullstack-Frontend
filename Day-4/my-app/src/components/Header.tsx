import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const auth = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    auth.logout();
    nav("/");
  };

  const toggleDark = () => {
    const isDark = document.documentElement.classList.contains("dark");
    auth.setThemeDark(!isDark);
  };

  return (
    <header className="bg-card px-4 py-3 shadow-sm dark:bg-[#071226]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500">
            MyStore
          </Link>
          <nav className="hidden sm:flex gap-3">
            <Link to="/products" className="text-sm hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Products</Link>
            <Link to="/dashboard" className="text-sm hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Dashboard</Link>
            <Link to="/admin" className="text-sm hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Admin</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleDark} className="px-2 py-1 rounded btn-focus" aria-label="toggle theme">
            Toggle theme
          </button>

          {auth.isAuthenticated ? (
            <>
              <span className="text-sm hidden sm:inline">Hi, {auth.user?.name}</span>
              <button onClick={onLogout} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-[#0e2134]">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-[#0e2134]">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}