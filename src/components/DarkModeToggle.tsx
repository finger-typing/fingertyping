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
      ? "bg-slate-800/40 hover:bg-slate-700/50 text-white border border-white/20 hover:border-slate-400/50"
      : "bg-white/50 hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300",
    "transform hover:scale-102 active:scale-98",
    "transition-all duration-200 ease-in-out",
    "backdrop-blur-sm"
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
