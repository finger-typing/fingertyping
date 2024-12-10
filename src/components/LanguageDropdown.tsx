import React, { useState, useEffect, useRef } from "react";
import {  Search, Globe } from "lucide-react";

// Define the props for the LanguageDropdown component
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
  // State to control the visibility of the language dropdown
  const [showLanguages, setShowLanguages] = useState(false);
  // State to store the search term for filtering languages
  const [searchTerm, setSearchTerm] = useState("");
  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // List of available languages
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
    "Abkhaz",
    "Afrikaans",
    "Vietnamese",
    "Tamil",
    "Telugu",
    "Manipuri",
    "Malayalam",
    "Kashmiri",
    "Gujarati",
    "Punjabi",
    "Sanskrit",
    "Sindhi",
    "Oriya",
    "Kannada",
    "Chakma",
    "Nepali",
    "Dari",
    "Dzongkha",
    "Korean",
    "Persian",
    "Bhojpuri",
    "Berber",
    "Amharic",
    "Yoruba",
    "Hausa",
    "Zulu",
  ];

  // Filter languages based on the search term
  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonClasses = `
    flex items-center px-2.5 py-1.5 rounded-lg font-medium text-sm
    ${darkMode 
      ? 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200' 
      : 'bg-teal-50 hover:bg-teal-100/80 text-teal-700'
    }
    transform hover:scale-105 active:scale-95
    transition-all duration-200 ease-in-out
    hover:shadow-md
    border border-teal-500/20
  `;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle the visibility of the language dropdown */}
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className={buttonClasses}
      >
        <Globe size={16} className="mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
        {language.toUpperCase()}
      </button>

      {/* Dropdown menu for selecting a language */}
      {showLanguages && (
        <div
          className={`absolute left-0 top-full z-10 mt-1 rounded border shadow-lg ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="p-2">
            <div className="relative">
              {/* Input field for searching languages */}
              <input
                type="text"
                placeholder="Search language"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-md py-1 pl-8 pr-2 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                }`}
              />
              <Search
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400"
              />
            </div>
          </div>
          <div className="max-h-72 w-48 overflow-y-auto">
            {/* List of filtered languages */}
            {filteredLanguages.map((lang) => (
              <div
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setShowLanguages(false);
                }}
                className={`cursor-pointer p-2 ${
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
