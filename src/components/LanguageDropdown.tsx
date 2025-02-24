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
      ? 'bg-slate-800/40 hover:bg-slate-700/50 text-white border border-white/20 hover:border-slate-400/50'
      : 'bg-white/50 hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300'}
    transform hover:scale-102 active:scale-98
    transition-all duration-200 ease-in-out
    backdrop-blur-sm
  `.trim();

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
          className={`absolute left-0 top-full z-50 mt-1 rounded-lg border shadow-lg backdrop-blur-lg
            ${darkMode
              ? "border-slate-700/30 bg-slate-800/90"
              : "border-slate-200 bg-white/90"
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
                className={`w-full rounded-lg py-1.5 pl-8 pr-2 text-sm border backdrop-blur-sm
                  ${darkMode
                    ? "bg-slate-800/40 border-slate-600/30 text-white placeholder-slate-400 focus:border-slate-400/50 focus:ring-slate-400/20"
                    : "bg-white/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:ring-slate-300/30"
                  }
                  focus:outline-none focus:ring-1
                  transition-all duration-200 ease-in-out
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
                className={`cursor-pointer px-3 py-2 text-sm transition-all duration-200
                  ${darkMode
                    ? "hover:bg-slate-700/50"
                    : "hover:bg-slate-100/80"
                  }
                  ${language === lang
                    ? darkMode
                      ? "bg-slate-700/30 font-medium"
                      : "bg-slate-100/50 font-medium"
                    : ""}
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
