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
  const buttonClasses = [
    "flex items-center px-2.5 py-1.5 rounded-lg font-medium text-sm",
    darkMode 
      ? "bg-teal-500/20 hover:bg-teal-500/30 text-white" 
      : "bg-teal-500/20 hover:bg-teal-500/30 text-white",
    "transform hover:scale-105 active:scale-95",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-teal-500/50",
    "border border-teal-500/20"
  ].join(" ");

  const iconClasses = "mr-1.5 transition-transform duration-300 hover:rotate-180";
  const underlineClasses = 
    "absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300";

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={buttonClasses}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
      type="button"
    >
      {darkMode ? (
        <>
          <Sun size={16} className={iconClasses} aria-hidden="true" />
          <span className="group relative">
            Light
            <span className={underlineClasses} />
          </span>
        </>
      ) : (
        <>
          <Moon size={16} className={iconClasses} aria-hidden="true" />
          <span className="group relative">
            Dark
            <span className={underlineClasses} />
          </span>
        </>
      )}
    </button>
  );
}
