import Link from 'next/link';

export default function About() {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-16 px-4">
        <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <span className="font-bold">FingerTyping</span>, your ultimate platform for secure, fast, and private typing practice in over <span className="font-bold">150 languages</span>. Whether you are learning to type in English, Spanish, Hindi, Arabic, or any other language, we have got you covered! Our mission is to provide a seamless, secure typing experience while helping users improve their typing speed and accuracy—without ever compromising on security or privacy.
        </p>
        
        <p className="text-lg leading-relaxed mb-6">
          At FingerTyping, we understand that typing is a critical skill in our fast-paced, digitally driven world. That is why we have designed a platform that serves typists of all levels, from beginners who are just starting to advanced users looking to perfect their speed and precision. With lessons, tests, and multilingual support, FingerTyping is here to help you achieve your goals, no matter what language you are practicing in.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Our platform offers a distraction-free, <span className="font-bold">ad-free environment</span> so you can focus on typing without interruptions. We are proud to say that we respect your privacy—<span className="font-bold">we do not track any personal information or typing data</span>. Your typing sessions are entirely private and stored locally in your browser. With FingerTyping, you can be confident that your personal data stays with you, not us.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          What&apos;s more, we provide full access to our comprehensive set of typing lessons, tests, and progress tracking tools <span className="font-bold">completely free of charge</span>. You won&apos;t find any hidden fees, subscriptions, or paywalls here. We believe that improving your typing skills should be accessible to everyone, no matter where you are from or which language you type in.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          <span className="font-bold">Multilingual Typing</span> is one of our core features. With support for over 150 languages, including major world languages and regional dialects, you can practice typing in your native language or learn a new one. We also support various keyboard layouts, so whether you are typing in QWERTY, AZERTY, Dvorak, or custom layouts, FingerTyping adapts to your needs.
        </p>

     

        <h2 className="text-3xl font-bold text-center mb-6">Our Features</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Real-time typing speed and accuracy tracking</li>
          <li>Customizable typing lessons and tests</li>
          <li>Progress tracking and performance analytics</li>
          <li>Support for multiple keyboard layouts</li>
          <li>Offline mode for uninterrupted practice</li>
        </ul>

        <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
        <p className="text-lg leading-relaxed mb-6">
          Our dedicated team of developers, linguists, and educators is passionate about making typing practice accessible and enjoyable for everyone. We are constantly working to improve FingerTyping and add new features based on user feedback.
        </p>

        <h2 className="text-3xl font-bold text-center mb-6">User Testimonials</h2>
        <blockquote className="italic text-lg leading-relaxed mb-6">
          &quot;FingerTyping has transformed the way I practice typing. The multilingual support is fantastic, and I love that it&apos;s completely ad-free!&quot; - <span className="font-bold">Alex T.</span>
        </blockquote>
        <blockquote className="italic text-lg leading-relaxed mb-6">
          &quot;I appreciate the privacy-focused approach of FingerTyping. It&apos;s great to know my data is safe while I improve my skills.&quot; - <span className="font-bold">Maria L.</span>
        </blockquote>

        <h2 className="text-3xl font-bold text-center mb-6">Our Vision</h2>
        <p className="text-lg leading-relaxed mb-6">
          At FingerTyping, we envision a world where everyone can communicate effortlessly through typing, regardless of language or location. We are committed to breaking down language barriers and empowering individuals with the skills they need to succeed in a digital world.
        </p>

        <h2 className="text-3xl font-bold text-center mb-6">Community Engagement</h2>
        <p className="text-lg leading-relaxed mb-6">
          We believe in the power of community and actively engage with our users to gather feedback and improve our platform. Join our community forums to connect with fellow typists, share tips, and participate in typing challenges.
        </p>

        <h2 className="text-3xl font-bold text-center mb-6">Future Plans</h2>
        <p className="text-lg leading-relaxed mb-6">
          We are excited about the future of FingerTyping and are constantly exploring new features and technologies to enhance your typing experience. Stay tuned for updates on our latest developments and upcoming features.
        </p>

           <h2 className="text-2xl text-yellow-500 font-semibold mb-4 flex justify-center items-center">
          😊 Happy Typing!
        </h2>
      </div>
    </div>
  );
}