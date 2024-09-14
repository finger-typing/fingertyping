import React, { useState } from "react";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";

// Define the interface for the Navbar component's props
interface NavbarProps {
  language: string; // current selected language
  setLanguage: (lang: string) => void; // function to update selected language
  darkMode: boolean; // boolean indicating dark mode status
  setDarkMode: (mode: boolean) => void; // function to toggle dark mode
  onCustomTextSubmit: (text: string) => void; // function to submit custom text
  onCustomTimeSubmit: (time: number) => void; // function to submit custom time
  customTime: number; // initial custom time value
}

// Define the Navbar functional component
const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onCustomTextSubmit,
  onCustomTimeSubmit,
  customTime,
}) => {
  // State to manage custom text input
  const [customText, setCustomText] = useState("");

  // State to manage temporary custom time (as a string)
  const [tempCustomTime, setTempCustomTime] = useState(customTime.toString());

  // State to toggle language dropdown visibility
  const [showLanguages, setShowLanguages] = useState(false);

  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array of languages available for selection
  const languages = [
    "English",
    "Bengali",
    "Arabic",
    "Urdu",
    "Chinese",
    "Hindi",
    "German",
    "Spanish",
    "French",
    "Italian",
    "Pashto",
    "Russian",
    "Turkish",
    "Japanese",
    "Indonesian",
    "Ukrainian",
    "Thai",
  ];

  // Function to handle custom text form submission
  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload on form submit
    if (customText.trim()) {
      // ensure input is not empty or whitespace
      onCustomTextSubmit(customText.trim()); // call the parent function to submit text
      setCustomText(""); // reset the text input
    }
  };

  // Function to handle custom time form submission
  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload on form submit
    const newTime = parseInt(tempCustomTime, 10); // convert the input string to an integer
    if (newTime > 0) {
      // ensure the time is valid (positive number)
      onCustomTimeSubmit(newTime); // call the parent function to submit the time
    }
  };

  // Dynamic classes for input fields based on dark mode status
  const inputClass = `p-2 border ${
    darkMode
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-black border-gray-300"
  }`;

  // Dynamic button class generator with background color as a parameter
  const buttonClass = (bgColor: string) => `p-2 border ${bgColor} text-white`;

  return (
    // Main navigation container with dynamic background based on dark mode
    <nav
      className={`w-full py-2 px-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button toggling */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}{" "}
              {/* Show X if open, Menu if closed */}
            </button>

            {/* Language dropdown */}
            <div className="relative">
              {/* Button to toggle language dropdown */}
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className={`flex items-center space-x-1 p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <span>{language || "Select Language"}</span>{" "}
                {/* Show selected language or prompt */}
                <ChevronDown size={18} /> {/* Dropdown arrow icon */}
              </button>

              {/* Dropdown list of languages */}
              {showLanguages && (
                <div
                  className={`absolute top-full left-0 mt-1 border rounded shadow-lg z-10 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="overflow-y-auto max-h-72 w-48">
                    {/* List of available languages */}
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          setLanguage(lang); // Update the language selection
                          setShowLanguages(false); // Close the dropdown
                        }}
                        className={`p-2 cursor-pointer ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        {lang} {/* Display each language */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Custom time and text input forms for larger screens */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Custom time input form */}
            <form
              onSubmit={handleCustomTimeSubmit}
              className="flex items-center"
            >
              <input
                type="number"
                // value={tempCustomTime}
                onChange={(e) => setTempCustomTime(e.target.value)}
                placeholder="Set time (s)"
                className={inputClass + " w-28"}
              />
              <button
                type="submit"
                className={buttonClass(
                  darkMode
                    ? "bg-green-600 border-green-700"
                    : "bg-green-500 border-green-600"
                )}
              >
                Time {/* Button to submit time */}
              </button>
            </form>

            {/* Custom text input form */}
            <form
              onSubmit={handleCustomTextSubmit}
              className="flex items-center"
            >
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your text"
                className={inputClass + " w-32"}
              />
              <button
                type="submit"
                className={buttonClass(
                  darkMode
                    ? "bg-blue-600 border-blue-700"
                    : "bg-blue-500 border-blue-600"
                )}
              >
                Set Custom Text {/* Button to submit custom text */}
              </button>
            </form>
          </div>

          {/* Dark mode toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)} // Toggle dark mode on button click
            className={`flex items-center space-x-1 p-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-300 border-gray-200"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}{" "}
            {/* Toggle between Sun (light mode) and Moon (dark mode) icons */}
            <span>{darkMode ? "Light" : "Dark"}</span>{" "}
            {/* Display the mode text */}
          </button>
        </div>

        {/* Mobile menu content */}
        {isMenuOpen && (
          <div className="mt-4 lg:hidden space-y-4">
            {/* Custom time input form for mobile */}
            <form
              onSubmit={handleCustomTimeSubmit}
              className="flex items-center"
            >
              <input
                type="number"
                value={tempCustomTime}
                onChange={(e) => setTempCustomTime(e.target.value)}
                placeholder="Set time (s)"
                className={inputClass + " flex-grow"}
              />
              <button
                type="submit"
                className={buttonClass(
                  darkMode
                    ? "bg-green-600 border-green-700"
                    : "bg-green-500 border-green-600"
                )}
              >
                Time
              </button>
            </form>

            {/* Custom text input form for mobile */}
            <form
              onSubmit={handleCustomTextSubmit}
              className="flex flex-col space-y-2"
            >
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter custom text"
                className={inputClass + " w-full"}
              />
              <button
                type="submit"
                className={buttonClass(
                  darkMode
                    ? "bg-blue-600 border-blue-700"
                    : "bg-blue-500 border-blue-600"
                )}
              >
                Set Custom Text
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; // Export the Navbar component for use in other files
