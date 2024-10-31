import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, MessageSquare } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import CustomInputs from "./CustomInputs";
import DarkModeToggle from "./DarkModeToggle";

// Define the props interface for the Navbar component
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
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to open feedback form in a new tab
  const sendFeedback = () => {
    window.open("https://forms.gle/D2QzunVpsg7nz9mc8", "_blank");
  };

  // Common button classes
  const buttonClasses = `h-8 px-1 text-xs sm:px-2 md:px-3 rounded transition duration-200 ease-in-out flex items-center justify-center ${
    darkMode
      ? "bg-gray-700 text-white border border-gray-300"
      : "bg-gray-100 text-black border border-gray-600"
  }`;

  // Common navigation item classes
  const navItemClasses = `h-8 px-1 text-xs sm:px-2 md:px-3 rounded flex items-center justify-center transition duration-200 ease-in-out`;

  return (
    <>
      {/* Main navigation bar */}
      <nav
        className={`w-full py-2 px-1 sm:px-4 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition duration-300 ease-in-out relative`}
      >
        {/* Navigation content */}
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`xl:hidden ${
                darkMode ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300 ease-in-out p-1`}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* LanguageDropdown - always visible */}
            <div className={navItemClasses}>
              <LanguageDropdown
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Learn button - always visible */}
          <Link href="/lesson" className={`${buttonClasses}`}>
            <BookOpen size={16} className="mr-1" />
            <span>Lesson</span>
          </Link>

          {/* Custom inputs and feedback button for larger screens */}
          <div className="hidden xl:flex items-center space-x-2 xl:ml-8">
            <CustomInputs
              darkMode={darkMode}
              onCustomTextSubmit={onCustomTextSubmit}
              onCustomTimeSubmit={onCustomTimeSubmit}
              customTime={customTime}
              isMobile={false}
            />
          </div>

          <div className="hidden xl:flex items-center space-x-2 xl:ml-8">
            <button
              onClick={sendFeedback}
              className={`${buttonClasses}`}
            >
              <MessageSquare size={17} className="mr-1" />
              Feedback
            </button>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1">
            {/* DarkModeToggle - always visible */}
            <div className={navItemClasses}>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
        </div>

        {/* Beautiful border effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-600 to-blue-200"></div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={`fixed top-0 left-0 w-full z-50 ${
            darkMode ? "bg-gray-900" : "bg-white"
          } transition-all duration-300 ease-in-out xl:hidden overflow-y-auto shadow-lg`}
        >
          <div className="container mx-auto px-3 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Menu
              </h2>
              {/* Close menu button */}
              <button
                title="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  darkMode ? "text-white" : "text-gray-900"
                } hover:text-gray-500 transition duration-300 ease-in-out`}
              >
                <X size={25} />
              </button>
            </div>
            {/* Custom inputs for mobile */}
            <CustomInputs
              darkMode={darkMode}
              onCustomTextSubmit={onCustomTextSubmit}
              onCustomTimeSubmit={onCustomTimeSubmit}
              customTime={customTime}
              isMobile={true}
            />
            {/* Feedback button for mobile */}
            <button
              onClick={sendFeedback}
              className={`mt-4 ${buttonClasses} w-full`}
            >
              <MessageSquare size={17} className="mr-1" />
              Feedback
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;