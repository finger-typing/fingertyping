import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "FingerTyping - Secure and Fast",
  description:
    "Secure, ad-free, and fast typing practice with 10 fast fingers on FingerTyping. Improve your typing speed and accuracy with our comprehensive typing lessons and tests. Join now and become a faster typist!",

  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "typing",
    "typeing",
    "typing practice",
    "finger typing",
    "10 fast fingers",
    "touch typing",
    "typing speed",
    "typing lessons",
    "typing tests",
    "improve typing",
    "keyboard skills",
    "secure typing app",
    "open source typing",
    "privacy-focused typing",
    "ad-free typing practice",
    "faster typing",
    "typeing website",
    "bangla typeing",
    "urdu typeing",
    "hindi typeing",
    "arabic typeing",
    "chinese typeing",
  ],
  authors: [{ name: "FingerTyping Team" }],
  creator: "FingerTyping",
  publisher: "FingerTyping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FingerTyping - Secure, Fast, and Private Typing Practice",
    description:
      "A secure, ad-free, and typing practice app. With your 10 fast finger complete comprehensive lessons and tests to become a faster typist!",
    url: "https://www.fingertyping.com",
    siteName: "FingerTyping",
    images: [
      {
        url: "https://www.fingertyping.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FingerTyping - Secure, Fast, and Private Typing Practice",
    description:
      "A secure, ad-free, and typing practice app. With your 10 fast finger complete comprehensive lessons and tests to become a faster typist!",
    images: ["https://www.fingertyping.com/og-image.png"],
    creator: "@fingertyping",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "FingerTyping",
              url: "https://www.fingertyping.com",
              description:
                "A secure, ad-free, and typing practice app. With your 10 fast finger complete comprehensive lessons and tests to become a faster typist!",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "FingerTyping",
                url: "https://www.fingertyping.com",
              },
              keywords:
                "typing practice, finger typing, 10 fast fingers, touch typing, typing speed, typing lessons, typing tests, improve typing, keyboard skills, secure typing app, open source typing, privacy-focused typing, ad-free typing practice",
            }),
          }}
        />

        {children}
        <Footer darkMode={true} />
      </body>
    </html>
  );
}
