import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  BookOpen,
  MessageSquare,
  Volume2,
  VolumeX,
  Gamepad,
} from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import CustomInputs from "./CustomInputs";
import DarkModeToggle from "./DarkModeToggle";
import { audioPlayer } from "../utils/audioUtils";

// Update the props interface to include sound-related props
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
  // State for mobile menu and sound
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Function to toggle sound
  const toggleSound = () => {
    const isEnabled = audioPlayer.toggleSound();
    setSoundEnabled(isEnabled);
  };

  // Function to open feedback form in a new tab
  const sendFeedback = () => {
    window.open("https://forms.gle/D2QzunVpsg7nz9mc8", "_blank");
  };

  // Common button classes
  const buttonClasses = `
    flex items-center px-2.5 py-1.5 rounded-lg font-medium text-sm
    ${darkMode 
      ? 'bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80' 
      : 'bg-white/90 hover:bg-slate-50 active:bg-slate-100'
    }
    transform hover:scale-105 active:scale-95
    transition-all duration-200 ease-in-out
    hover:shadow-md
    border ${darkMode ? 'border-slate-700/50' : 'border-slate-200'}
  `;

  const navItemClasses = `
    relative group
    ${darkMode ? 'text-slate-100' : 'text-slate-800'}
    transition-colors duration-200
  `;

  return (
    <>
      <nav
        className={`w-full backdrop-blur-md ${
          darkMode ? "bg-slate-900/95 text-white" : "bg-white/95 text-slate-900"
        }  transition-all duration-300 ease-in-out shadow-md z-50 sticky top-0`}
      >
        {/* Navigation content */}
        <div className="container mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center space-x-2">
              {/* Mobile menu toggle button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-1.5 rounded-lg
                  ${darkMode 
                    ? 'hover:bg-slate-800/60 active:bg-slate-700/60' 
                    : 'hover:bg-slate-100 active:bg-slate-200'
                  }
                  transition-all duration-200
                `}
              >
                {isMenuOpen ? (
                  <X size={18} className="transform transition-transform duration-200 rotate-90" />
                ) : (
                  <Menu size={18} className="transform transition-transform duration-200 hover:rotate-180" />
                )}
              </button>

              {/* LanguageDropdown - always visible */}
              <div className={navItemClasses}>
                <LanguageDropdown
                  language={language}
                  setLanguage={setLanguage}
                  darkMode={darkMode}
                />
              </div>

              {/* Navigation buttons - hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link 
                  href="/lesson" 
                  className={`${buttonClasses} group
                    ${darkMode 
                      ? 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200 border-teal-500/20' 
                      : 'bg-teal-50 hover:bg-teal-100/80 text-teal-700 border-teal-400/20'
                    }
                  `}
                >
                  <BookOpen size={16} className="mr-1.5 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="relative">
                    Lesson
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>

                <Link 
                  href="/game" 
                  className={`${buttonClasses} group
                    ${darkMode 
                       ? 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200 border-teal-500/20' 
                      : 'bg-teal-50 hover:bg-teal-100/80 text-teal-700 border-teal-400/20'
                    }
                  `}
                >
                  <Gamepad size={16} className="mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative">
                    Game
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Center section - Custom inputs */}
            <div className="hidden lg:flex flex-1 justify-center mx-3">
              <div className={`
                ${darkMode ? 'bg-slate-800/40 hover:bg-slate-800/60' : 'bg-slate-50/80 hover:bg-slate-100/80'}
                backdrop-blur-sm rounded-xl p-1
                shadow-lg hover:shadow-xl
                border-2 ${darkMode ? 'border-slate-600/50 hover:border-slate-500/50' : 'border-slate-300/80 hover:border-slate-400/80'}
                transition-all duration-300 ease-in-out
                ring-1 ring-slate-400/20 hover:ring-slate-400/30
                transform hover:scale-[1.02]
              `}>
                <CustomInputs
                  darkMode={darkMode}
                  onCustomTextSubmit={onCustomTextSubmit}
                  onCustomTimeSubmit={onCustomTimeSubmit}
                  customTime={customTime}
                  isMobile={false}
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2">
                <button 
                  onClick={sendFeedback} 
                  className={`${buttonClasses} group
                    ${darkMode 
                      ? 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200 border-teal-500/20' 
                      : 'bg-teal-50 hover:bg-teal-100/80 text-teal-700 border-teal-400/20'
                    }
                  `}
                >
                  <MessageSquare size={16} className="mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden lg:inline relative">
                    Feedback
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>

                <button
                  onClick={toggleSound}
                  className={`${buttonClasses} group
                    ${darkMode 
                       ? 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200 border-teal-500/20' 
                      : 'bg-teal-50 hover:bg-teal-100/80 text-teal-700 border-teal-400/20'
                    }
                  `}
                  aria-label="Toggle sound"
                  title={soundEnabled ? "Mute sound" : "Unmute sound"}
                >
                  {soundEnabled ? (
                    <Volume2 size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <VolumeX size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <span className="hidden lg:ml-1.5 lg:inline relative">
                    Sound
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>
              </div>

              {/* DarkModeToggle - always visible */}
              <div className={navItemClasses}>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful gradient border effect */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-sky-500 via-fuchsia-500 to-teal-500 opacity-60"></div>
      </nav>

      {/* Mobile menu with improved styling */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-50 ${
            darkMode ? "bg-slate-900/95" : "bg-white/95"
          } backdrop-blur-md overflow-y-auto transition-all duration-300 ease-in-out lg:hidden`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Menu
              </h2>
              <button
                title="button"
                onClick={() => setIsMenuOpen(false)}
                className={`p-1.5 rounded-lg
                  ${darkMode 
                    ? 'hover:bg-slate-800/60 active:bg-slate-700/60' 
                    : 'hover:bg-slate-100 active:bg-slate-200'
                  }
                  transition-all duration-200
                `}
              >
                <X size={18} className="transform transition-transform duration-200 hover:rotate-90" />
              </button>
            </div>

            <div className="space-y-4">
              <Link 
                href="/lesson" 
                className={`${buttonClasses} w-full justify-center group
                  ${darkMode 
                    ? 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 border-sky-500/20' 
                    : 'bg-sky-50 hover:bg-sky-100/80 text-sky-700 border-sky-400/20'
                  }
                `}
              >
                <BookOpen size={16} className="mr-1.5 group-hover:rotate-6 transition-transform duration-300" />
                Lesson
              </Link>

              <Link 
                href="/game" 
                className={`${buttonClasses} w-full justify-center group
                  ${darkMode 
                    ? 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/20' 
                    : 'bg-fuchsia-50 hover:bg-fuchsia-100/80 text-fuchsia-700 border-fuchsia-400/20'
                  }
                `}
              >
                <Gamepad size={16} className="mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
                Game
              </Link>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800/40' : 'bg-slate-50/80'} backdrop-blur-sm border ${darkMode ? 'border-slate-700/30' : 'border-slate-200/80'}`}>
                <CustomInputs
                  darkMode={darkMode}
                  onCustomTextSubmit={onCustomTextSubmit}
                  onCustomTimeSubmit={onCustomTimeSubmit}
                  customTime={customTime}
                  isMobile={true}
                />
              </div>

              <button 
                onClick={toggleSound}
                className={`${buttonClasses} w-full justify-center group
                  ${darkMode 
                    ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border-amber-500/20' 
                    : 'bg-amber-50 hover:bg-amber-100/80 text-amber-700 border-amber-400/20'
                  }
                `}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 size={16} className="mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                    Sound On
                  </>
                ) : (
                  <>
                    <VolumeX size={16} className="mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                    Sound Off
                  </>
                )}
              </button>

              <button 
                onClick={sendFeedback}
                className={`${buttonClasses} w-full justify-center group
                  ${darkMode 
                    ? 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200 border-teal-500/20' 
                    : 'bg-teal-50 hover:bg-teal-100/80 text-teal-700 border-teal-400/20'
                  }
                `}
              >
                <MessageSquare size={16} className="mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
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
