// app/contact/page.tsx
"use client"; // Add this line to mark the component as a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // if using App Router

export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Google Forms link
    window.open("https://forms.gle/D2QzunVpsg7nz9mc8", "_blank");
    // Optionally, navigate back to the homepage or another page
    router.push("/"); // redirect to home after opening the link in a new tab
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-center text-xl">Redirecting to the Contact Form...</p>
    </div>
  );
}
