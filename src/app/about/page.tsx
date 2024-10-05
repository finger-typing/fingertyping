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
          At FingerTyping, we understand that typing is a critical skill in our fast-paced, digitally driven world. That is why we have designed a platform that serves typists of all levels, from beginners who are just starting to advanced users looking to perfect their speed and precision. With lessons, tests, and multilingual support, FingerTyping is here to help you achieve your goals, no matter what language you  are practicing in.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Our platform offers a distraction-free, <span className="font-bold">ad-free environment</span> so you can focus on typing without interruptions. We are proud to say that we respect your privacy—<span className="font-bold">we do not track any personal information or typing data</span>. Your typing sessions are entirely private and stored locally in your browser. With FingerTyping, you can be confident that your personal data stays with you, not us.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Whats more, we provide full access to our comprehensive set of typing lessons, tests, and progress tracking tools <span className="font-bold">completely free of charge</span>. You won not find any hidden fees, subscriptions, or paywalls here. We believe that improving your typing skills should be accessible to everyone, no matter where you are from or which language you type in.
        </p>

        <p className="text-lg leading-relaxed">
          <span className="font-bold">Multilingual Typing</span> is one of our core features. With support for over 150 languages, including major world languages and regional dialects, you can practice typing in your native language or learn a new one. We also support various keyboard layouts, so whether you are typing in QWERTY, AZERTY, Dvorak, or custom layouts, FingerTyping adapts to your needs.
        </p>

        <h2 className="text-2xl text-yellow-500 font-semibold mb-4 flex justify-center items-center">
          😊 Happy Typing!
        </h2>
      </div>
    </div>
  );
}
