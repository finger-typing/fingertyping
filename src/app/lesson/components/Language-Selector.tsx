import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

type Language = string;

interface LanguageSelectorProps {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  languageLetters: Record<string, string[]>;
}

export default function LanguageSelector(
  {
    currentLanguage,
    setCurrentLanguage,
    languageLetters,
  }: LanguageSelectorProps = {
    currentLanguage: "English",
    setCurrentLanguage: () => {},
    languageLetters: {},
  },
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredLanguages = Object.keys(languageLetters).filter((lang) =>
    lang.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLanguageSelect = (language: string) => {
    setCurrentLanguage(language as Language);
    setIsLanguageDropdownOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (isLanguageDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLanguageDropdownOpen]);

  return (
    <div className="relative mb-4">
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border bg-gray-100 p-2 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
      >
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold text-white">
            {currentLanguage[0]}
          </div>
          <span className="text-lg font-medium text-gray-800 dark:text-white">
            {currentLanguage}
          </span>
        </div>
        <div
          className={`transform transition-transform duration-200 ${
            isLanguageDropdownOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </div>
      </div>

      {isLanguageDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg dark:bg-gray-800">
          <div className="border-b p-3">
            <div className="relative">
              <input
                type="text"
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language..."
                className="w-full rounded-md border-none bg-gray-100 py-2 pl-10 pr-4 text-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              {searchQuery && (
                <button
                  title="search_button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-28 overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <div
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className="flex cursor-pointer items-center space-x-2 p-3 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold text-white">
                    {lang[0]}
                  </div>
                  <span className="text-gray-800 dark:text-white">{lang}</span>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
