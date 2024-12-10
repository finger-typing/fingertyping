import React from "react";
import { Sun, Moon } from "lucide-react";

// Props interface for the DarkModeToggle component
interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

// DarkModeToggle component for switching between light and dark modes
export default function DarkModeToggle({
  darkMode,
  setDarkMode,
}: DarkModeToggleProps) {
  const buttonClasses = `
    flex items-center px-2.5 py-1.5 rounded-lg font-medium text-sm
    ${darkMode 
      ? 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-200' 
      : 'bg-fuchsia-50 hover:bg-fuchsia-100/80 text-fuchsia-700'
    }
    transform hover:scale-105 active:scale-95
    transition-all duration-200 ease-in-out
    hover:shadow-md
    border border-fuchsia-500/20
  `;

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={buttonClasses}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <>
          <Sun size={16} className="mr-1.5 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative">
            Light
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </>
      ) : (
        <>
          <Moon size={16} className="mr-1.5 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative">
            Dark
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </>
      )}
    </button>
  );
}
