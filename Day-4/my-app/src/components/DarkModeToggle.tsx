import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsDark(true);
    else if (saved === "light") setIsDark(false);
  }, []);

  return (
    <button
      onClick={() => setIsDark((s) => !s)}
      aria-pressed={isDark}
      className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
    >
      {isDark ? "Dark" : "Light"}
    </button>
  );
}