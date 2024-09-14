import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface LanguageDropdownProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  language,
  setLanguage,
  darkMode,
}) => {
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    "English",
    "Bengali",
    "Arabic",
    "Urdu",
    "Chinese",
    "Hindi",
    "Russian",
    "Japanese",
    "German",
    "Spanish",
    "French",
    "Italian",
    "Pashto",
    "Turkish",
    "Portuguese",
    "Indonesian",
    "Ukrainian",
    "Thai",
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className={`flex items-center space-x-1 p-2 rounded border ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <span>{language || "Select Language"}</span>
        <ChevronDown size={18} />
      </button>

      {showLanguages && (
        <div
          className={`absolute top-full left-0 mt-1 border rounded shadow-lg z-10 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="overflow-y-auto max-h-72 w-48">
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setShowLanguages(false);
                }}
                className={`p-2 cursor-pointer ${
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
  );
};

export default LanguageDropdown;
