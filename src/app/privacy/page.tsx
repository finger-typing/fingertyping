// app/privacy/page.tsx
import Link from "next/link";

// Privacy component for the privacy policy page
export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      {/* Back to Home link */}
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>
      
      {/* Privacy Policy content */}
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      
      {/* Introduction */}
      <p className="text-lg leading-relaxed mb-6">
        At <span className="font-bold">FingerTyping</span>, we value your
        privacy and are committed to protecting your personal information. This
        Privacy Policy outlines how we collect, use, and safeguard your data.
      </p>
      
      {/* Information Collection and Use */}
      <h2 className="text-2xl font-semibold mb-4">Information Collect and Use</h2>
      <p className="text-lg leading-relaxed mb-6">
        We do not collect any personal information or data on our website. 
      </p>
      
      {/* Cookies */}
      <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
      <p className="text-lg leading-relaxed mb-6">
        We do not use cookies on our website.
      </p>
      
      {/* Data Security */}
      <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
      <p className="text-lg leading-relaxed mb-6">
        We take data security seriously. We do not collect or sell or share your data with third parties.
      </p>
      
      {/* Closing message */}
      <h2 className="text-2xl text-yellow-500 font-semibold mb-4 flex justify-center items-center">😊 Happy Typing </h2>
    </div>
  );
}
