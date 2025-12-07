import { UserButton } from '@clerk/nextjs';
import { Brain, Map, BookOpen } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">LearnForge</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-amber-600 bg-amber-50 rounded-lg font-medium border border-amber-200">
              ⓘ Personalize your content!
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Generate Content Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Generate Content</h1>
          <p className="text-gray-600 text-lg mb-8">
            Create personalized study roadmaps and quizzes to enhance your learning.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Generate Roadmaps Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generate <span className="text-gray-600">Roadmaps</span>
              </h2>
              <p className="text-gray-600 mb-6">
                A step-by-step study plan with built-in quizzes
              </p>
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                Let's Start
              </button>
            </div>

            {/* Generate Quiz Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generate <span className="text-gray-600">Quiz</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Test your knowledge with AI-generated quizzes
              </p>
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                Let's Start
              </button>
            </div>
          </div>
        </section>

        {/* Your Roadmaps Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Roadmaps</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center text-gray-500 py-8">
              <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p>No roadmaps yet. Create your first one above!</p>
            </div>
          </div>
        </section>

        {/* Your Quizzes Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Quizzes</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center text-gray-500 py-8">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p>No quizzes yet. Generate your first one above!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}