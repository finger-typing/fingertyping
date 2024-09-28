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
      className={`flex items-center space-x-1 px-2 py-2 rounded border border-gray-400 ${
        darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      <span>{darkMode ? "Light" : "Dark"}</span>
    </button>
  );
};

export default DarkModeToggle;
