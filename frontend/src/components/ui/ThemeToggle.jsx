import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center hover:scale-105 transition"
    >
      {theme === "dark" ? (
        <Sun size={24} />
      ) : (
        <Moon size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;