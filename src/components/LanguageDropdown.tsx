import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    "English",
    "Bangla",
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

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className={`flex items-center space-x-1 p-2 rounded border ${
          darkMode ? "bg-gray-700 border-gray-300" : "bg-white border-gray-600"
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
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search language"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-8 pr-2 py-1 rounded-md ${
                  darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                }`}
              />
              <Search
                size={16}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-72 w-48">
            {filteredLanguages.map((lang) => (
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