// components/ThemeToggle.js
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("custom-dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 bg-gray-200 rounded-full shadow-md hover:scale-105 transition-transform"
    >
      {dark ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-indigo-800" />
      )}
    </button>
  );
}
