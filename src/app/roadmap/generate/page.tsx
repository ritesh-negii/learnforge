'use client';

import React, { useState } from 'react';
import { Brain, ArrowLeft, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapGenerator() {
  const [step, setStep] = useState<'form' | 'generating' | 'result'>('form');
  const [formData, setFormData] = useState({
    topic: '',
    difficulty: 'intermediate',
    duration: '4',
  });
  const [roadmap, setRoadmap] = useState<any>(null);
  const [saving, setSaving] = useState(false);

 const handleSubmit = async () => {
  if (!formData.topic) return;
  setStep('generating');

  try {
    // Call AI API to generate roadmap
    const response = await fetch('/api/generate/roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: formData.topic,
        difficulty: formData.difficulty,
        duration: formData.duration,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate roadmap');
    }

    const data = await response.json();
    setRoadmap(data.roadmap);
    setStep('result');
  } catch (error) {
    console.error('Error generating roadmap:', error);
    alert('Failed to generate roadmap. Please try again.');
    setStep('form');
  }
};
  const handleSaveRoadmap = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roadmap),
      });

      if (response.ok) {
        alert('Roadmap saved successfully! ✅');
      } else {
        alert('Failed to save roadmap. Please try again.');
      }
    } catch (error) {
      console.error('Error saving roadmap:', error);
      alert('Failed to save roadmap. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">LearnForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Form Step */}
        {step === 'form' && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Generate Your Learning Roadmap
              </h1>
              <p className="text-gray-600 text-lg">
                Tell us what you want to learn and we'll create a personalized study plan
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {/* Topic Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  What do you want to learn? *
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., React, Python, Machine Learning"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Difficulty Level */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Current Level *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, difficulty: level })}
                      className={`px-4 py-3 rounded-lg font-medium capitalize transition ${
                        formData.difficulty === level
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">
                  Study Duration (weeks) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!formData.topic}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate Roadmap
              </button>
            </div>
          </div>
        )}

        {/* Generating Step */}
        {step === 'generating' && (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl border border-gray-200 p-12">
              <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Crafting Your Personalized Roadmap
              </h2>
              <p className="text-gray-600">
                AI is analyzing the best learning path for {formData.topic}...
              </p>
            </div>
          </div>
        )}

        {/* Result Step */}
        {step === 'result' && roadmap && (
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {roadmap.title}
                  </h1>
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
                <button 
                  onClick={handleSaveRoadmap}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Roadmap'}
                </button>
              </div>

              {/* Phases */}
              <div className="space-y-6">
                {roadmap.phases.map((phase: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
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
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep('form')}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Generate Another
              </button>
              <Link href="/dashboard" className="flex-1">
                <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                  Back to Dashboard
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}