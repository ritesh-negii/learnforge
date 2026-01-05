'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapDetails() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch(`/api/roadmap?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch roadmap');

      const data = await res.json();
      setRoadmap(data.roadmap);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Roadmap not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            {roadmap.topic} Roadmap
          </h1>

          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {roadmap.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium capitalize">
              {roadmap.difficulty}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {roadmap.duration} weeks
            </span>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {roadmap.phases.map((phase: any, index: number) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {phase.week}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
              </div>

              <ul className="space-y-2">
                {phase.topics.map((topic: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
