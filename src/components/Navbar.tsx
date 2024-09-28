import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import CustomInputs from "./CustomInputs";
import DarkModeToggle from "./DarkModeToggle";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sendFeedback = () => {
    window.open("https://forms.gle/D2QzunVpsg7nz9mc8", "_blank");
  };

  return (
    <>
      <nav
        className={`w-full py-2 px-3 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition duration-300 ease-in-out relative`}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden ${
                darkMode ? "text-white" : "text-gray-900"
              } hover:text-gray-500 transition duration-300 ease-in-out p-1`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <LanguageDropdown
              language={language}
              setLanguage={setLanguage}
              darkMode={darkMode}
            />
          </div>

          <div className="hidden lg:flex items-center space-x-4 flex-grow justify-center">
            <CustomInputs
              darkMode={darkMode}
              onCustomTextSubmit={onCustomTextSubmit}
              onCustomTimeSubmit={onCustomTimeSubmit}
              customTime={customTime}
              isMobile={false}
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={sendFeedback}
              className={`hidden lg:block ${
                darkMode
                  ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
              } h-10 px-4 text-sm rounded transition duration-200 ease-in-out border border-gray-400 `}
            >
              Feedback
            </button>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
        
        {/* Beautiful border effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-600 to-blue-200"></div>
      </nav>

      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-50 ${
            darkMode ? "bg-gray-900" : "bg-white"
          } transition-all duration-300 ease-in-out lg:hidden`}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Menu
              </h2>
              <button
                title="menu"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  darkMode ? "text-white" : "text-gray-900"
                } hover:text-gray-500 transition duration-300 ease-in-out`}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <CustomInputs
                darkMode={darkMode}
                onCustomTextSubmit={onCustomTextSubmit}
                onCustomTimeSubmit={onCustomTimeSubmit}
                customTime={customTime}
                isMobile={true}
              />
              <button
                onClick={sendFeedback}
                className={`mt-3 border border-gray-400 ${
                  darkMode
                    ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                } h-10 px-4 rounded transition duration-300 ease-in-out w-full`}
              >
                Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;