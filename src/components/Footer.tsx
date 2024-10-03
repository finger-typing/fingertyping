// components/Footer.tsx

import React from "react";
import Link from "next/link";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const links = [
    { href: "/", text: "← Back to Home" },
    { href: "/about", text: "About Us" },
    { href: "/privacy", text: "Privacy Policy" },
    { href: "/terms", text: "Terms and Conditions" },
    { href: "/blog", text: "FingerTyping Blog" },
    {
      href: "https://forms.gle/D2QzunVpsg7nz9mc8",
      text: "Contact Us",
      external: true,
    },
  ];

  return (
    <footer
      className={`w-full py-6 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center">
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline cursor-pointer"
                >
                  {link.text}
                </a>
              ) : (
                <Link href={link.href}>
                  <span className="hover:underline cursor-pointer">
                    {link.text}
                  </span>
                </Link>
              )}
              {index < links.length - 1 && <span className="mx-2">|</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 text-center text-sm">
          © {new Date().getFullYear()} FingerTyping.com (All rights reserved)
        </div>
      </div>
    </footer>
  );
};

export default Footer;
