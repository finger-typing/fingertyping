"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  BookOpen,
  MessageSquare,
  Volume2,
  VolumeX,
  Github,
} from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import CustomInputs from "./CustomInputs";
import DarkModeToggle from "./DarkModeToggle";
import { audioPlayer } from "../utils/audioUtils";
import { useApp } from "@/context/AppContext";

// NavButton Component
interface NavButtonProps {
  onClick?: () => void;
  href?: string;
  icon: React.ReactNode;
  label: string;
  darkMode: boolean;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  href,
  icon,
  label,
  darkMode,
  className,
}) => {
  const baseClasses = `
    flex items-center px-3 py-1.5 rounded-lg font-medium text-sm
    ${darkMode
      ? "border-white/10 bg-slate-800/40 text-white hover:bg-slate-700/50 hover:border-slate-400/50"
      : "border-slate-200 bg-white/50 text-slate-800 hover:bg-slate-100 hover:border-slate-300"}
    transform hover:scale-102 active:scale-98
    transition-all duration-200 ease-in-out
    border backdrop-blur-sm
    ${className || ""}
  `.trim();

  const content = (
    <>
      {icon}
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-teal-500 transition-all duration-300 group-hover:w-full" />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} group`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} group`}>
      {content}
    </button>
  );
};

// Navbar Component
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

  const toggleSound = () => setSoundEnabled(audioPlayer.toggleSound());

  const navItems = useMemo(
    () => [
      {
        href: "/lesson",
        icon: (
          <BookOpen
            size={18}
            className="mr-2 transition-transform duration-300 group-hover:rotate-6"
          />
        ),
        label: "Lesson",
      },
      {
        onClick: () =>
          window.open(
            "https://github.com/Mdhasibulislamgit/fingertyping",
            "_blank",
          ),
        icon: (
          <Github
            size={18}
            className="mr-2 transition-transform duration-300 group-hover:rotate-12"
          />
        ),
        label: "Github",
      },
      {
        onClick: () =>
          window.open("https://forms.gle/D2QzunVpsg7nz9mc8", "_blank"),
        icon: (
          <MessageSquare
            size={18}
            className="mr-2 transition-transform duration-300 group-hover:rotate-12"
          />
        ),
        label: "Feedback",
      },
      {
        onClick: toggleSound,
        icon: soundEnabled ? (
          <Volume2
            size={18}
            className="mr-2 transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <VolumeX
            size={18}
            className="mr-2 transition-transform duration-300 group-hover:scale-110"
          />
        ),
        label: soundEnabled ? "Sound On" : "Sound Off",
      },
    ],
    [soundEnabled],
  );

  return (
    <>
      <nav className={`w-full backdrop-blur-lg ${
        darkMode ? "bg-slate-900/90 text-white" : "bg-white/90 text-slate-900"
      } sticky top-0 z-50 shadow-lg transition-all duration-300`}>
        <div className="container mx-auto px-2 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`rounded-lg p-2 lg:hidden ${
                  darkMode ? "hover:bg-slate-800/60" : "hover:bg-slate-100"
                } transition-all duration-200`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              <div className={`rounded-lg border p-1 shadow-md backdrop-blur-lg ${
                darkMode ? "bg-slate-800/30 border-slate-600/30" : "bg-white/50 border-slate-200"
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
        } overflow-y-auto backdrop-blur-lg lg:hidden`}>
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${
                darkMode ? "text-white/90" : "text-slate-800"
              }`}>
                Menu
              </h2>
              <button
                title="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg p-2.5 ${
                  darkMode
                    ? "hover:bg-slate-800/60 text-white/90"
                    : "hover:bg-slate-100 text-slate-800"
                } transition-all duration-200 hover:scale-105 active:scale-95`}
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
                  ? "bg-slate-800/30 border-slate-700/30"
                  : "bg-white/50 border-slate-200"
              } p-6 backdrop-blur-lg shadow-lg`}>
                <h3 className={`mb-4 font-medium ${
                  darkMode ? "text-white/90" : "text-slate-800"
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
