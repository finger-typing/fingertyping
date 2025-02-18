import React from 'react';
import { Fingerprint } from "lucide-react";
import Link from "next/link";

interface MainPageFooterProps {
  darkMode: boolean;
}

const footerLinks = [
  { href: "/lesson", text: "Learn to Type" },
  { href: "/about", text: "About Us" },
  { href: "/blog", text: "Blog" },
  { href: "/privacy", text: "Privacy Policy" },
  { href: "/terms", text: "Terms and Conditions" },
  { href: "/contact", text: "Contact Us" },
] as const;

const MainPageFooter: React.FC<MainPageFooterProps> = ({ darkMode }) => {
  const getThemeClasses = (isDark: boolean) => ({
    footer: isDark 
      ? "bg-gray-800" 
      : "bg-white",
    icon: isDark ? "text-indigo-400" : "text-indigo-600",
    title: isDark ? "text-white" : "text-gray-700",
    subtitle: isDark ? "text-gray-300" : "text-gray-600",
    link: isDark
      ? "text-indigo-400 hover:text-indigo-200"
      : "text-indigo-600 hover:text-indigo-800"
  });

  const theme = getThemeClasses(darkMode);

  return (
    <footer className={`mt-5 rounded-lg shadow-lg p-4 md:p-4 lg:p-5 ${theme.footer}`}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-8 text-center md:mb-0 md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Fingerprint className={`mr-2 h-8 w-8 ${theme.icon}`} />
              <h2 className={`text-2xl font-bold sm:text-3xl ${theme.title}`}>
                FingerTyping
              </h2>
            </div>
            <p className={`mt-2 text-sm sm:text-base ${theme.subtitle}`}>
              Simple, Open Source and Ads-Free
            </p>
          </div>

          <nav className="mb-6 flex flex-wrap justify-center gap-6 md:mb-0 md:justify-end">
            {footerLinks.map(({ href, text }) => (
              <Link key={href} href={href}>
                <span className={`
                  cursor-pointer 
                  text-sm 
                  font-medium 
                  transition-colors 
                  duration-300 
                  sm:text-base 
                  ${theme.link} 
                  hover:underline
                `}>
                  {text}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default MainPageFooter;
