import React from 'react';
import { FaExternalLinkAlt, FaStar, FaKeyboard, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colorClass = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800',
    'Beginner to Intermediate': 'bg-blue-100 text-blue-800',
    'Beginner to Advanced': 'bg-purple-100 text-purple-800',
  }[difficulty] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${colorClass}`}>
      {difficulty}
    </span>
  );
};

const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="mt-4 space-y-2">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center">
        <FaKeyboard className="text-indigo-500 mr-2" />
        <span className="text-gray-700">{feature}</span>
      </li>
    ))}
  </ul>
);

const Top10TypingWebsites = () => {
  const websites = [
    {
      name: "FingerTyping",
      url: "https://fingertyping.com",
      description:
        "A modern, user-friendly typing website with customizable exercises and real-time feedback.",
      features: [
        "Customizable exercises",
        "No ads",
        "No Tracking",
        "Real-time feedback",
        "User-friendly interface",
      ],
      difficulty: "Beginner to Advanced",
    },
    {
      name: "Typing.com",
      url: "https://www.typing.com",
      description:
        "Offers free typing courses for beginners to advanced users, with engaging lessons and games.",
      features: ["Free courses", "Engaging lessons", "Games"],
      difficulty: "Beginner to Advanced",
    },
    {
      name: "10FastFingers",
      url: "https://10fastfingers.com",
      description:
        "Features typing tests, competitions, and multiplayer games to improve typing speed.",
      features: ["Typing tests", "Competitions", "Multiplayer games"],
      difficulty: "Intermediate",
    },
    {
      name: "TypeRacer",
      url: "https://play.typeracer.com",
      description:
        "Multiplayer typing game that allows you to race against others in real-time.",
      features: ["Multiplayer racing", "Real-time competition"],
      difficulty: "Advanced",
    },
    {
      name: "Ratatype",
      url: "https://www.ratatype.com",
      description:
        "Provides typing courses, tests, and games with a focus on proper finger placement.",
      features: [
        "Typing courses",
        "Focus on finger placement",
        "Tests and games",
      ],
      difficulty: "Beginner",
    },
    {
      name: "Keybr",
      url: "https://www.keybr.com",
      description:
        "Uses an adaptive algorithm to create personalized typing lessons based on your performance.",
      features: ["Adaptive algorithm", "Personalized lessons"],
      difficulty: "Intermediate",
    },
    {
      name: "Typing Club",
      url: "https://www.typingclub.com",
      description:
        "Offers a comprehensive typing curriculum with interactive lessons and progress tracking.",
      features: [
        "Comprehensive curriculum",
        "Interactive lessons",
        "Progress tracking",
      ],
      difficulty: "Beginner to Intermediate",
    },
    {
      name: "Monkeytype",
      url: "https://monkeytype.com",
      description:
        "A minimalist typing test website with customizable themes and various test modes.",
      features: [
        "Minimalist design",
        "Customizable themes",
        "Various test modes",
      ],
      difficulty: "Intermediate",
    },
    {
      name: "The Typing Cat",
      url: "https://thetypingcat.com",
      description:
        "Features typing tests, games, and lessons with a cute cat theme.",
      features: ["Typing tests", "Games", "Cat theme"],
      difficulty: "Beginner",
    },
    {
      name: "Nitro Type",
      url: "https://www.nitrotype.com",
      description:
        "A racing-themed typing game that's particularly popular among students.",
      features: ["Racing theme", "Popular among students"],
      difficulty: "Beginner to Intermediate",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold mb-4 text-center text-indigo-700">
          Top 10 Typing Website
        </h1>
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </Link>
        <p className="mb-12 text-center text-xl text-gray-600 max-w-3xl mx-auto">
          Boost your productivity and efficiency in today is digital world by
          improving your typing skills. Explore our curated list of the top 10
          typing websites to enhance your speed and accuracy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((site, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-indigo-600">
                    {site.name}
                  </h2>
                  <span className="text-3xl font-bold text-indigo-200">
                    #{index + 1}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{site.description}</p>
                <FeatureList features={site.features} />
              </div>
              <div className="bg-indigo-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <DifficultyBadge difficulty={site.difficulty} />
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    Try it out <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">
            Start Your Typing Journey Today!
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Whether you are a beginner looking to learn proper typing techniques
            or an advanced user aiming to increase your speed, these websites
            offer a variety of tools and resources to help you achieve your
            typing goals. Regular practice on these platforms can lead to
            significant improvements in your typing skills over time.
          </p>
          <button className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center mx-auto">
            <FaStar className="mr-2" /> Start Improving Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top10TypingWebsites;
