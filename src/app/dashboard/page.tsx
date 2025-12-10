'use client';

import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Brain, Map, BookOpen, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Roadmap {
  _id: string;
  topic: string;
  difficulty: string;
  duration: number;
  progress: number;
  createdAt: string;
}

interface QuizResult {
  _id: string;
  topic: string;
  percentage: number;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch roadmaps
      const roadmapsRes = await fetch('/api/roadmap');
      if (roadmapsRes.ok) {
        const data = await roadmapsRes.json();
        setRoadmaps(data.roadmaps);
      }

      // Fetch quiz results
      const quizResultsRes = await fetch('/api/quiz/result');
      if (quizResultsRes.ok) {
        const data = await quizResultsRes.json();
        setQuizResults(data.results);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
              <Link href="/roadmap/generate">
                <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                  Let's Start
                </button>
              </Link>
            </div>

            {/* Generate Quiz Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generate <span className="text-gray-600">Quiz</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Test your knowledge with AI-generated quizzes
              </p>
              <Link href="/quiz/generate">
                <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                  Let's Start
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Your Roadmaps Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Roadmaps</h2>
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : roadmaps.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {roadmaps.map((roadmap) => (
                <div
                  key={roadmap._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {roadmap.topic}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded capitalize">
                          {roadmap.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {roadmap.duration} weeks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{roadmap.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
                        style={{ width: `${roadmap.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {formatDate(roadmap.createdAt)}
                    </span>
                    <button className="text-orange-600 hover:text-orange-700 font-semibold">
                      Continue →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center text-gray-500 py-8">
                <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p>No roadmaps yet. Create your first one above!</p>
              </div>
            </div>
          )}
        </section>

        {/* Your Quiz Results Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Quiz Results</h2>
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : quizResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizResults.map((result) => (
                <div
                  key={result._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {result.topic}
                  </h3>
                  <div className="mb-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-1">
                      {result.percentage}%
                    </div>
                    <p className="text-sm text-gray-600">
                      {result.score} / {result.totalQuestions} correct
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {formatDate(result.completedAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center text-gray-500 py-8">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p>No quiz results yet. Take your first quiz above!</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
