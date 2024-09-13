import React, { useState } from "react";

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  onCustomTextSubmit: (text: string) => void;
  onCustomTimeSubmit: (time: number) => void;
  customTime: number;
}

const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onCustomTextSubmit,
  onCustomTimeSubmit,
  customTime,
}) => {
  const [customText, setCustomText] = useState("");
  const [tempCustomTime, setTempCustomTime] = useState(customTime.toString());
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    "English",
    "Bengali",
    "Arabic",
    "Urdu",
    "Chinese",
    "Hindi",
    "German",
    "Spanish",
    "French",
    "Italian",
    "Pashto",
    "Russian",
    "Turkish",
    "Japanese",
    "Indonesian",
    "Ukrainian",
    "Thai",
  ];

  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      onCustomTextSubmit(customText.trim());
      setCustomText("");
    }
  };

  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTime = parseInt(tempCustomTime, 10);
    if (!isNaN(newTime) && newTime > 0) {
      onCustomTimeSubmit(newTime);
    }
  };

  return (
    <nav
      className={`w-full p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="relative flex items-center">
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className={`flex items-center p-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <span className="mr-2">{language || "Select Language"}</span>
            <svg
              className={`w-4 h-4 transform ${
                showLanguages ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke={darkMode ? "white" : "black"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showLanguages && (
            <div
              className={`absolute top-full mt-1 border rounded shadow-lg z-10 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            >
              <div className="overflow-y-auto max-h-72 w-60">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguages(false);
                    }}
                    className={`p-3 cursor-pointer hover:bg-gray-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleCustomTimeSubmit}
          className="flex items-center mt-2 sm:mt-0"
        >
          <input
            type="number"
            // value={tempCustomTime}
            onChange={(e) => setTempCustomTime(e.target.value)}
            placeholder="Set time (s) "
            className={`p-2  border w-28  ${
              darkMode
                ? "bg-gray-700 text-white  border-gray-600"
                : "bg-white text-black border-gray-300"
            } `}
          />
          <button
            type="submit"
            className={`p-2 border ${
              darkMode
                ? "bg-green-600 text-white border-green-700"
                : "bg-green-500 text-white border-green-600"
            }`}
          >
            Time
          </button>
        </form>

        <form
          onSubmit={handleCustomTextSubmit}
          className="flex items-center mt-2 sm:mt-0"
        >
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter custom text"
            className={`p-2  border ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <button
            type="submit"
            className={`p-2  border ${
              darkMode
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-blue-500 text-white border-blue-600"
            }`}
          >
            Set Custom Text
          </button>
        </form>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded border ${
            darkMode
              ? "bg-gray-600 border-gray-500 text-white"
              : "bg-gray-300 border-gray-200 text-black"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
