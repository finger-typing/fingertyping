import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Game - Coming Soon | FingerTyping",
  description: "Get ready for an exciting typing game experience. Coming soon!",
}

export default function GamePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full max-w-3xl mx-auto p-8">
        {/* Enhanced background with subtle texture */}
        

        <div className="relative text-center z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500" aria-label="Game Mode">
            Game Mode
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12">
            Game is coming soon.
          </p>

          <a
            href="/"
            className="inline-block px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 rounded-full hover:scale-105 transform transition-transform duration-200"
            aria-label="Return to Home"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
}