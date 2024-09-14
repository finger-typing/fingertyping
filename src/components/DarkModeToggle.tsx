import React from "react";
import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`flex items-center space-x-1 p-2 rounded border ${
        darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-300 border-gray-200"
      }`}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      <span>{darkMode ? "Light" : "Dark"}</span>
    </button>
  );
};

export default DarkModeToggle;
