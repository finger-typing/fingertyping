import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Updated metadata for SEO optimization with keywords
export const metadata: Metadata = {

  title: "FingerTyping - Secure and Fast",
  description:
    "Secure, ad-free, and fast typing practice with 10 fast fingers on FingerTyping. Improve your typing speed and accuracy with our comprehensive typing lessons and tests. Join now and become a faster typist!",

  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "typing",
    "typing practice",
    "finger typing",
    "10 fast fingers",
    "ten fingers typing",
    "typing speed",
    "touch typing",
    "typing lessons",
    "typing tests",
    "increase typing speed",
    "typing accuracy",
    "typing exercises",
    "keyboard skills",
    "improve typing",
    "typing app",
    "typeing",
    "typeing practice",
    "ten finger typeing",
  ], // Fixed typos in keywords
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Meta Tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Added Keywords for SEO */}
        <meta
          name="keywords"
          content="typing, typing practice, finger typing, 10 fast fingers, ten fingers typing, typing speed, touch typing, typing lessons, typing tests, increase typing speed, typing accuracy, typing exercises, keyboard skills, improve typing, typing app, typeing, typeing practice, ten finger typeing"
        />

        {/* Open Graph Meta Tags for Social Media */}
        <meta
          property="og:title"
          content="FingerTyping - Secure and fast "
        />
        <meta
          property="og:description"
          content="Secure, ad-free, and fast typing practice with 10 fast fingers on FingerTyping. Improve your typing speed and accuracy with our comprehensive typing lessons and tests. Join now and become a faster typist!"
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.fingertyping.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="FingerTyping - Secure and Fast"
        />
        <meta
          name="twitter:description"
          content="Secure, ad-free, and fast typing practice with 10 fast fingers on FingerTyping. Improve your typing speed and accuracy with our comprehensive typing lessons and tests. Join now and become a faster typist!"
        />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Structured Data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FingerTyping",
            url: "https://www.fingertyping.com",
            description: "Secure, ad-free, and fast typing practice with 10 fast fingers on FingerTyping. Improve your typing speed and accuracy with our comprehensive typing lessons and tests. Join now and become a faster typist!",
            publisher: {
              "@type": "Organization",
              name: "FingerTyping",
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.fingertyping.com/search?query={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
