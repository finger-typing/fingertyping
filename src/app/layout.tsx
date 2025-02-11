import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fingertyping.com"),
  title: {
    default: "Finger Typing - Open Source Typing Practice",
    template: "%s | FingerTyping",
  },
  description:
    "Improve your typing speed and accuracy with our secure, ad-free lessons. Perfect for beginners and advanced typists. Open source and fully secure.",
  keywords: [
    "typing practice",
    "typing lessons",
    "typing speed",
    "typing accuracy",
    "open source typing",
    "secure typing",
    "free typing lessons",
    "typing tests",
    "typing exercises",
    "typing games",
    "typing practice software",
    "typing software",
    "finger typeing",
    "fingertyping"
  ],
  authors: [{ name: "FingerTyping Team" }],
  publisher: "FingerTyping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "Finger Typing - Open Source Typing Practice",
    description: "Free typing lessons and speed tests for all skill levels. Open source and fully secure.",
    images: ["https://www.fingertyping.com/og-image.png"],
    url: "https://www.fingertyping.com",
    siteName: "FingerTyping",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finger Typing - Open Source Typing Practice",
    description: "Improve typing skills with free and secure lessons. Open source and fully secure.",
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
  alternates: {
    canonical: "https://www.fingertyping.com",
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FingerTyping",
              "applicationCategory": "EducationalApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free online typing practice platform to improve typing speed and accuracy. Open source and fully secure.",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript",
              "url": "https://www.fingertyping.com"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}