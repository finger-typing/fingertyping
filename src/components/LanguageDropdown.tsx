import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";

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
    lang.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle the visibility of the language dropdown */}
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className={`flex items-center space-x-1 p-2 rounded border ${
          darkMode ? "bg-gray-700 border-gray-300" : "bg-white border-gray-600"
        }`}
      >
        <span>{language || "Select Language"}</span>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown menu for selecting a language */}
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
              {/* Input field for searching languages */}
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
            {/* List of filtered languages */}
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
