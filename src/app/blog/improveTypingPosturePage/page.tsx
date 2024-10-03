import Link from 'next/link';

export default function ImproveTypingPosturePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Blog
      </Link>

      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-200 mb-6">How to Improve Your Typing Posture and Avoid Strain</h1>

        <p className="text-lg text-gray-400 mb-4">
          When practicing typing, most people focus on speed and accuracy. However, typing posture is just as important. Poor typing posture can lead to discomfort, strain, and even long-term injury. In this post, we wll look at how you can improve your posture while typing and avoid unnecessary strain.
        </p>

        <h2 className="text-3xl font-semibold text-gray-200 mt-8">Why Typing Posture Matters</h2>
        <p className="text-gray-400 mb-4">
          Spending long hours typing without proper posture can lead to strain on your wrists, neck, shoulders, and back. Repeated bad posture can even cause issues like carpal tunnel syndrome. Maintaining good posture not only reduces strain but also helps improve your focus and typing efficiency.
        </p>

        <h2 className="text-3xl font-semibold text-gray-200 mt-8">Tips for Proper Typing Posture</h2>
        <p className="text-gray-300 mb-4">
          Here are some tips for maintaining a healthy posture while typing:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>Keep Your Feet Flat</strong>: Ensure your feet are flat on the floor, with your knees at a 90-degree angle. This helps stabilize your posture and prevents slouching.</li>
          <li><strong>Use a Chair with Good Support</strong>: Choose a chair that supports your lower back. Your chair should allow you to sit with your back straight and your shoulders relaxed.</li>
          <li><strong>Keep Your Wrists Elevated</strong>: When typing, your wrists should hover slightly above the keyboard. Avoid resting them on the desk, as this can lead to wrist strain.</li>
          <li><strong>Position Your Monitor Correctly</strong>: Your monitor should be at eye level, about an arm is length away, to avoid neck strain. Adjust your screen height so you are not looking down or up at it.</li>
          <li><strong>Take Regular Breaks</strong>: Don’t sit in one position for too long. Take short breaks every 30 minutes to stand up, stretch, and shake out any tension in your hands and arms.</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <h3 className="text-xl font-semibold text-blue-600">Pro Tip</h3>
          <p className="text-gray-600 mt-2">
            Try doing wrist stretches before and after long typing sessions. This helps prevent tightness and keeps your hands relaxed.
          </p>
        </div>

        <h2 className="text-3xl font-semibold text-gray-200 mt-8">How Good Posture Improves Typing Efficiency</h2>
        <p className="text-gray-300 mb-4">
          Typing in a comfortable, ergonomic position allows you to focus on the task at hand without distractions caused by discomfort. Good posture promotes better concentration, reduces fatigue, and helps you type for longer periods without strain.
        </p>
        <p className="text-gray-300">
          Make posture a priority during your typing practice sessions. Combine it with daily typing exercises, and you wll see improvements in both comfort and typing performance.
        </p>
      </article>
    </div>
  );
}
