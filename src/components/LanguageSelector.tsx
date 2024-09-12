import React from "react";
import Button from "./Button";
import { wordLists } from "../utils/wordLists";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
  darkMode,
}) => (
  <div className="flex space-x-2 min-w-max p-3">
    {Object.keys(wordLists).map((lang) => (
      <Button
        key={lang}
        onClick={() => setLanguage(lang)}
        className={`${
          language === lang
            ? darkMode
              ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
              : "bg-gray-300 text-gray-900 hover:bg-gray-400"
            : darkMode
            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } whitespace-nowrap`}
      >
        {lang}
      </Button>
    ))}
  </div>
);

export default LanguageSelector;
