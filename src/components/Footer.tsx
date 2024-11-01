import React from "react";

// Import social media icons from react-icons
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaRedditAlien,
} from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";

// Define the props interface for the Footer component
interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  // Array of social media links with their respective icons and URLs
  const socialLinks = [
    {
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://fingertyping.com")}&text=${encodeURIComponent("Improve your typing skills with FingerTyping.com! 🚀⌨️")}`,
    },
    {
      icon: FaFacebookF,
      href: `https://www.facebook.com/fingertypingofficial`,
    },
    {
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=https://fingertyping.com&title=FingerTyping.com&summary=Improve your typing skills!`,
    },
    {
      icon: FaTelegramPlane,
      href: `https://t.me/fingertyping`,
    },
    {
      icon: FaRedditAlien,
      href: `https://www.reddit.com/submit?url=https://fingertyping.com&title=Check out this awesome typing tool!`,
    },
    {
      icon: BsMessenger,
      href: `https://www.facebook.com/dialog/send?link=https://fingertyping.com&redirect_uri=https://fingertyping.com&app_id=966242223397117`,
    },
  ];

  return (
    <footer className="w-full bg-gray-900 py-4 text-gray-300">
      <hr className="border-gray-700" />
      <div className="flex flex-col items-center justify-between px-10 sm:flex-row">
        {/* Copyright notice */}
        <p className="mb-4 text-center text-sm text-gray-500 sm:mb-0 sm:text-left">
          © {new Date().getFullYear()} FingerTyping
        </p>
        {/* Social media links */}
        <div className="flex space-x-2">
          {socialLinks.map(({ icon: Icon, href }, index) => (
            <a
              title="social media share"
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-gray-500 transition-colors duration-300 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
