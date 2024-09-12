import React from "react";
import { wordLists } from "../utils/wordLists";

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
}) => {
  return (
    <nav
      className={`w-full ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg p-1`}
    >
      <div className="flex justify-between items-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Language selector"
          className={`p-2 rounded-md ${
            darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900"
          }`}
        >
          {Object.keys(wordLists).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            darkMode
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
