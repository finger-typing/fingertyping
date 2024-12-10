import React from 'react';
import { Fingerprint } from "lucide-react";
import Link from "next/link";

interface MainpagefooterProps {
  darkMode: boolean;
}

const ShareSection: React.FC<MainpagefooterProps> = ({ darkMode }) => {
  

    const links = [
        { href: "/lesson", text: "Learn to Type", external: false },
        { href: "/about", text: "About Us", external: false },
        { href: "/blog", text: "Blog", external: false },
        { href: "/privacy", text: "Privacy Policy", external: false },
        { href: "/terms", text: "Terms and Conditions", external: false },
        { href: "/contact", text: "Contact Us", external: false },
      ];
      

  return (
    <footer
    className={`mt-5 rounded-lg shadow-lg p-4 md:p-4 lg:p-5 ${
      darkMode
        ? "bg-gray-800"
        : "bg-gradient-to-r from-blue-50 to-indigo-100"
    }`}
  >
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-8 text-center md:mb-0 md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <Fingerprint
              className={`mr-2 h-8 w-8 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <h2
              className={`text-2xl font-bold sm:text-3xl ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              FingerTyping
            </h2>
          </div>
          <p
            className={`mt-2 text-sm sm:text-base ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Secure, Simple and Ads-Free
          </p>
        </div>
        <nav className="mb-6 flex flex-wrap justify-center gap-6 md:mb-0 md:justify-end">
          {links.map((link) => (
            <React.Fragment key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium transition-colors duration-300 sm:text-base ${
                    darkMode
                      ? "text-indigo-300 hover:text-indigo-100"
                      : "text-indigo-700 hover:text-indigo-900"
                  } hover:underline`}
                >
                  {link.text}
                </a>
              ) : (
                <Link href={link.href}>
                  <span
                    className={`cursor-pointer text-sm font-medium transition-colors duration-300 sm:text-base ${
                      darkMode
                        ? "text-indigo-400 hover:text-indigo-200"
                        : "text-indigo-600 hover:text-indigo-800"
                    } hover:underline`}
                  >
                    {link.text}
                  </span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  </footer>
  );
};

export default ShareSection;
