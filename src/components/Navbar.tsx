"use client";

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
import { useApp } from "@/context/AppContext";
import { usePathname } from 'next/navigation';

const NavButton: React.FC<{
  onClick?: () => void;
  href?: string;
  icon: React.ReactNode;
  label: string;
  darkMode: boolean;
  className?: string;
}> = ({ onClick, href, icon, label, darkMode, className }) => {
  const baseClasses = `
    flex items-center px-2.5 py-1.5 rounded-lg font-medium text-sm
    ${darkMode 
      ? "border-teal-500/20 bg-teal-500/20 text-white hover:bg-teal-500/30" 
      : "border-teal-500/20 bg-teal-500/20 text-white hover:bg-teal-500/30"}
    transform hover:scale-105 active:scale-95
    transition-all duration-200 ease-in-out
    hover:shadow-md border
    ${className || ""}
  `;

  const content = (
    <>
      {icon}
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-teal-500 transition-all duration-300 group-hover:w-full" />
      </span>
    </>
  );

  return href ? (
    <Link href={href} className={`${baseClasses} group`}>
      {content}
    </Link>
  ) : (
    <button onClick={onClick} className={`${baseClasses} group`}>
      {content}
    </button>
  );
};

const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    onCustomTextSubmit,
    onCustomTimeSubmit,
    customTime,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled(audioPlayer.toggleSound());
  };

  const navItems = [
    {
      href: "/lesson",
      icon: <BookOpen size={16} className="mr-1.5 transition-transform duration-300 group-hover:rotate-6" />,
      label: "Lesson",
    },
    {
      href: "/game",
      icon: <Gamepad size={16} className="mr-1.5 transition-transform duration-300 group-hover:rotate-12" />,
      label: "Game",
    },
    {
      onClick: () => window.open("https://forms.gle/D2QzunVpsg7nz9mc8", "_blank"),
      icon: <MessageSquare size={16} className="mr-1.5 transition-transform duration-300 group-hover:rotate-12" />,
      label: "Feedback",
    },
    {
      onClick: toggleSound,
      icon: soundEnabled ? (
        <Volume2 size={16} className="mr-1.5 transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <VolumeX size={16} className="mr-1.5 transition-transform duration-300 group-hover:scale-110" />
      ),
      label: "Sound",
    },
  ];

  const pathname = usePathname();

  const isLessonPage = pathname === "/lesson";

  return (
    <>
      <nav className={`w-full backdrop-blur-md ${
        darkMode ? "bg-slate-900/95 text-white" : "bg-white/95 text-slate-900"
      } sticky top-0 z-50 shadow-md transition-all duration-300 ${isLessonPage ? 'some-class' : 'other-class'}`}>
        <div className="container mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`rounded-lg p-1.5 lg:hidden ${
                  darkMode ? "hover:bg-slate-800/60" : "hover:bg-slate-100"
                } transition-all duration-200`}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <LanguageDropdown
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
              />

              <div className="hidden items-center space-x-2 lg:flex">
                {navItems.slice(0, 2).map((item, index) => (
                  <NavButton
                    key={index}
                    {...item}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>

            <div className="mx-3 hidden flex-1 justify-center lg:flex">
              <div className={`rounded-xl border-2 p-1 shadow-lg backdrop-blur-sm ${
                darkMode ? "bg-slate-800/40 border-slate-600/50" : "bg-slate-50/80 border-slate-300/80"
              }`}>
                <CustomInputs
                  darkMode={darkMode}
                  onCustomTextSubmit={onCustomTextSubmit}
                  onCustomTimeSubmit={onCustomTimeSubmit}
                  customTime={customTime}
                  isMobile={false}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden items-center space-x-2 lg:flex">
                {navItems.slice(2).map((item, index) => (
                  <NavButton
                    key={index}
                    {...item}
                    darkMode={darkMode}
                  />
                ))}
              </div>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-sky-500 via-fuchsia-500 to-teal-500 opacity-60" />
      </nav>

      {isMenuOpen && (
        <div className={`fixed inset-0 z-50 ${
          darkMode ? "bg-slate-900/95" : "bg-white/95"
        } overflow-y-auto backdrop-blur-md lg:hidden`}>
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Menu
              </h2>
              <button
                title="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg p-2 ${
                  darkMode ? "hover:bg-slate-800/60" : "hover:bg-slate-100"
                } transition-all duration-200`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <NavButton
                    key={index}
                    {...item}
                    darkMode={darkMode}
                    className="w-full justify-center py-3 text-base"
                  />
                ))}
              </div>
              
              <div className={`mt-8 rounded-xl border ${
                darkMode 
                  ? "bg-slate-800/40 border-slate-700/30" 
                  : "bg-slate-50/80 border-slate-200/80"
              } p-5 backdrop-blur-sm shadow-lg`}>
                <h3 className={`mb-4 font-medium ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}>
                  Custom Settings
                </h3>
                <CustomInputs
                  darkMode={darkMode}
                  onCustomTextSubmit={onCustomTextSubmit}
                  onCustomTimeSubmit={onCustomTimeSubmit}
                  customTime={customTime}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
