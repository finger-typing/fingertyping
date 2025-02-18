"use client";

import React from "react";
import { Fingerprint } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";

const Footer: React.FC = () => {
  const { darkMode } = useApp();

  return (
    <footer
      className={`w-full border-t ${
        darkMode ? "border-gray-800 bg-gray-800" : "border-gray-900 bg-white"
      }`}
    >
      <hr />
      <div className="container mx-auto px-4 py-4">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center justify-center text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <a href="/" className="flex items-center space-x-2">
                <Fingerprint
                  className={`h-8 w-8 ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <span>FingerTyping</span>
              </a>
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span
              className={`text-sm ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Made by
            </span>
            <FaHeart className="h-4 w-5 text-red-500" />
            <a
              href="https://www.linkedin.com/in/mdhasibulislamin/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-bold hover:underline ${
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
