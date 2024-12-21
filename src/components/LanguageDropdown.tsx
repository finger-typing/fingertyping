import React, { useState, useEffect, useRef } from "react";
import { Search, Globe } from "lucide-react";
import { wordLists } from "@/utils/wordLists";
import { languageLetters, Language } from "@/app/lesson/components/Letter-list";
import { usePathname } from 'next/navigation';

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isLessonPage = pathname === '/lesson';

  // Get available languages based on the current page
  const getAvailableLanguages = () => {
    if (isLessonPage) {
      // On lesson page, only show languages that have letters defined
      return Object.keys(languageLetters) as Language[];
    } else {
      // On main page, only show languages that have words defined
      return Object.keys(wordLists) as string[];
    }
  };

  // Filter languages based on search term
  const filteredLanguages = getAvailableLanguages().filter((lang: string) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle language selection with validation
  const handleLanguageSelect = (selectedLang: string) => {
    if (isLessonPage && !(selectedLang in languageLetters)) {
      console.warn(`Language "${selectedLang}" does not have letters defined`);
      return;
    }
    if (!isLessonPage && !(selectedLang in wordLists)) {
      console.warn(`Language "${selectedLang}" does not have words defined`);
      return;
    }
    setLanguage(selectedLang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const buttonClasses = `
    flex items-center px-2.5 py-1.5 rounded-lg font-medium text-sm
    ${darkMode 
      ? 'bg-teal-500/20 hover:bg-teal-500/30 text-white' 
      : 'bg-teal-700 hover:bg-teal-800 text-white'}
    transform hover:scale-105 active:scale-95
    transition-all duration-200 ease-in-out
    hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500
    border border-teal-500/20
  `;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label="Select language"
      >
        <Globe 
          size={16} 
          className="mr-1.5 transition-transform duration-300" 
        />
        <span>{language}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 top-full z-50 mt-1 rounded-lg border shadow-lg
            ${darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
            }`}
        >
          <div className="p-2">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search language"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-md py-1.5 pl-8 pr-2 text-sm
                  ${darkMode 
                    ? "bg-gray-700 text-white placeholder-gray-400" 
                    : "bg-gray-100 text-black placeholder-gray-500"
                  }
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                `}
              />
              <Search
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400"
              />
            </div>
          </div>

          <div className="max-h-72 w-48 overflow-y-auto">
            {filteredLanguages.map((lang: string) => (
              <div
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className={`cursor-pointer px-3 py-2 text-sm
                  ${darkMode 
                    ? "hover:bg-gray-700" 
                    : "hover:bg-gray-100"
                  }
                  ${language === lang ? "font-medium" : ""}
                `}
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
