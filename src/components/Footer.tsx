"use client";

import React from "react";
import { Fingerprint } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";

const Footer: React.FC = () => {
  const { darkMode } = useApp();

  return (
    <footer className={`w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="container-responsive mx-auto px-3 py-4 sm:px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <Fingerprint
                className={`h-6 w-6 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
              <span
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                FingerTyping
              </span>
            </a>
          </div>

          <div className="flex items-center space-x-1">
            <span
              className={`text-sm ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Made by
            </span>
            <FaHeart className="h-4 w-4 text-red-500" />
            <a
              href="https://www.linkedin.com/in/mdhasibulislamin/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-semibold hover:underline ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Md Hasibul Islam
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
