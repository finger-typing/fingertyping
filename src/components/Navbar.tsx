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

  // Open Gmail directly when the Feedback button is clicked
 const sendFeedback = () => {
   window.open("https://forms.gle/napKwoY9QN7YKuoa7", "_blank");
 };


  return (
    <nav
      className={`w-full py-2 px-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <LanguageDropdown
              language={language}
              setLanguage={setLanguage}
              darkMode={darkMode}
            />
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <CustomInputs
              darkMode={darkMode}
              onCustomTextSubmit={onCustomTextSubmit}
              onCustomTimeSubmit={onCustomTimeSubmit}
              customTime={customTime}
            />
          </div>

          {/* Feedback Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={sendFeedback}
              className={`btn ${darkMode ? "bg-gray-600" : "bg-gray-300"} px-4 py-2 rounded`}
            >
              Feedback
            </button>

            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 lg:hidden space-y-4">
            <CustomInputs
              darkMode={darkMode}
              onCustomTextSubmit={onCustomTextSubmit}
              onCustomTimeSubmit={onCustomTimeSubmit}
              customTime={customTime}
              isMobile={true}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
