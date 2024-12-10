import React from "react";
import Link from "next/link";
import { Fingerprint } from "lucide-react";
import {
  FaXTwitter,
  FaGithub,
  FaTelegram,
  FaHeart,
} from "react-icons/fa6";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const mainLinks = [
    { label: "Practice", href: "/practice" },
    { label: "Contact Us", href: "/contact" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
   
  ];

  

  const socialLinks = [
    { 
      icon: FaXTwitter, 
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    "https://fingertyping.com",
                  )}&text=${encodeURIComponent(
                    "Secure and ads-free typing practice with FingerTyping.com! 🚀⌨️",
                  )}`,
      label: "Twitter",
      ariaLabel: "Share on Twitter"
    },
    { 
      icon: FaGithub, 
      href: "#",
      label: "GitHub",
      ariaLabel: "Visit GitHub"
    },
    { 
      icon: FaTelegram, 
      href: "https://t.me/fingertyping",
      label: "Telegram",
      ariaLabel: "Join Telegram"
    },
  ];

  return (
    <footer 
      className={`w-full border-t ${
        darkMode 
          ? "bg-black/50 border-gray-800" 
          : "bg-white/50 border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex items-center space-x-2">
            <Fingerprint 
              className={`h-8 w-8 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <span className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              FingerTyping
            </span>
          </div>
          <p className={`max-w-md text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Security is our top priority.
          </p>
          
          {/* Main Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {mainLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
              >
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  darkMode 
                    ? "text-gray-300 hover:text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className={`rounded-full p-2 transition-all duration-200 ${
                  darkMode 
                    ? "text-gray-400 hover:text-white hover:bg-white/10" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-4 flex flex-col items-center justify-between space-y-2 pt-2 text-center border-t md:flex-row md:text-left md:space-y-0 ${
          darkMode ? "border-gray-800" : "border-gray-100"
        }`}>
          <div className="flex items-center space-x-1">
            <span className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Made by
            </span>
            <FaHeart className="h-4 w-5 text-red-500" />
            <span className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Md Hasibul Islam
            </span>
          </div>

        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
