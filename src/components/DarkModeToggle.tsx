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
      className={`flex items-center space-x-1 px-2 py-2 rounded  ${
        darkMode ? "bg-gray-700 text-md border border-gray-300 " : "bg-gray-100 text-md border border-gray-600"
      }`}
    >
      {darkMode ? <Sun size={17} /> : <Moon size={17} />}
      <span>{darkMode ? "Light" : "Dark"}</span>
    </button>
  );
};

export default DarkModeToggle;
