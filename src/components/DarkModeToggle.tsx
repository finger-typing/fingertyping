import React from "react";
import { Moon, Sun } from "lucide-react";

// Props interface for the DarkModeToggle component
interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

// DarkModeToggle component for switching between light and dark modes
const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      // Dynamic classes based on current mode
      className={`flex items-center space-x-1 px-2 py-2 rounded  ${
        darkMode ? "bg-gray-700 text-md border border-gray-300 " : "bg-gray-100 text-md border border-gray-600"
      }`}
    >
      {/* Icon changes based on current mode */}
      {darkMode ? <Sun size={17} /> : <Moon size={17} />}
      {/* Text changes based on current mode */}
      <span>{darkMode ? "Light" : "Dark"}</span>
    </button>
  );
};

export default DarkModeToggle;
