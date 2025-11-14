import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-pressed={dark}
      className="p-2 rounded-md border"
      title="Toggle dark mode"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}