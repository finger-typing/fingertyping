import React from "react";

import { Fingerprint } from "lucide-react";
import { FaHeart } from "react-icons/fa6";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      className={`w-full border-t ${
        darkMode ? "border-gray-800 bg-gray-800" : "border-gray-100 bg-white/50"
      }`}
    >
      <hr />
      <div className="container mx-auto px-4 py-4">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex items-center space-x-2">
            <Fingerprint
              className={`h-8 w-8 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <span
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              FingerTyping
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Made by
            </span>
            <FaHeart className="h-4 w-5 text-red-500" />
            <span
              className={`text-sm font-bold ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Md Hasibul Islam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
