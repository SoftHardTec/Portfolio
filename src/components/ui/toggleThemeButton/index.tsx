import { useTheme } from "../ProviderTheme/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="cursor-pointer shadow-xl/3 shadow-2xl rounded-full p-3 hover:scale-110 duration-300"
      onClick={toggleTheme}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </button>
  );
}
