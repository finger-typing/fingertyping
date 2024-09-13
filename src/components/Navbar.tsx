import React, { useState } from "react";
import { wordLists } from "../utils/wordLists";

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  onCustomTextSubmit: (text: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onCustomTextSubmit,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customText, setCustomText] = useState("");

  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomTextSubmit(customText);
    setCustomText("");
    setShowCustomInput(false);
  };

  return (
    <nav
      className={`w-full ${
        darkMode ? "bg-gray-800" : "bg-white-100"
      } shadow-lg p-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <select
            title="Choose a language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`p-2 rounded-md ${
              darkMode
                ? "bg-gray-700 text-gray-200 border-white"
                : "bg-gray-200 text-gray-900 border-white"
            }`}
          >
            {Object.keys(wordLists).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className={` p-2 rounded-md transition duration-300 ease-in-out ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-500"
                : "bg-gray-300 text-black hover:bg-gray-400 border border-black"
            }`}
          >
            {showCustomInput ? "Hide Custom" : "Custom Text"}
          </button>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md transition duration-300 ease-in-out ${
            darkMode
              ? "bg-gray-700 text-gray-100 hover:bg-gray-600 border border-light"
              : "bg-gray-600 text-gray-100 hover:bg-black border border-teal"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {showCustomInput && (
        <form onSubmit={handleCustomTextSubmit} className="mt-4 flex space-x-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter custom text here..."
            className={`flex-grow p-2 rounded-md ${
              darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              darkMode
                ? "bg-green-700 text-white hover:bg-green-500"
                : "bg-green-700 text-white hover:bg-green-500"
            }`}
          >
            Submit
          </button>
        </form>
      )}
    </nav>
  );
};

export default Navbar;
