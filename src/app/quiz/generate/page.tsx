'use client';

import React, { useState } from 'react';
import { Brain, ArrowLeft, Sparkles, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizGenerator() {
  const [step, setStep] = useState<'form' | 'generating' | 'quiz' | 'results'>('form');
  const [formData, setFormData] = useState({
    topic: '',
    difficulty: 'intermediate',
    numberOfQuestions: '5',
  });
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleGenerate = () => {
    if (!formData.topic) return;
    setStep('generating');

    // Simulate API call - we'll add real AI later
    setTimeout(() => {
      const mockQuiz: Question[] = Array.from({ length: parseInt(formData.numberOfQuestions) }, (_, i) => ({
        question: `Question ${i + 1} about ${formData.topic}: What is the correct approach?`,
        options: [
          'This is option A',
          'This is option B (correct)',
          'This is option C',
          'This is option D',
        ],
        correctAnswer: 1,
        explanation: `The correct answer is B because it demonstrates the fundamental principle of ${formData.topic} in this context.`,
      }));
      setQuiz(mockQuiz);
      setSelectedAnswers(new Array(mockQuiz.length).fill(-1));
      setStep('quiz');
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz[index].correctAnswer) correct++;
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.length) * 100);

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
                Generate Your Quiz
              </h1>
              <p className="text-gray-600 text-lg">
                Test your knowledge with AI-generated questions
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {/* Topic Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Quiz Topic *
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., React Hooks, Python Basics, SQL Queries"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Difficulty Level */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Difficulty Level *
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

              {/* Number of Questions */}
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">
                  Number of Questions *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.numberOfQuestions}
                  onChange={(e) => setFormData({ ...formData, numberOfQuestions: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleGenerate}
                disabled={!formData.topic}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate Quiz
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
                Generating Your Quiz
              </h2>
              <p className="text-gray-600">
                AI is creating questions about {formData.topic}...
              </p>
            </div>
          </div>
        )}

        {/* Quiz Step */}
        {step === 'quiz' && quiz.length > 0 && (
          <div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {quiz.length}</span>
                <span>{Math.round(((currentQuestion + 1) / quiz.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {quiz[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {quiz[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  const isCorrect = index === quiz[currentQuestion].correctAnswer;
                  const showResult = showExplanation;

                  return (
                    <button
                      key={index}
                      onClick={() => !showExplanation && handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full text-left px-6 py-4 rounded-lg border-2 transition ${
                        showResult
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : isSelected
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 bg-white'
                          : isSelected
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-orange-300'
                      } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{option}</span>
                        {showResult && (
                          isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : isSelected ? (
                            <XCircle className="w-6 h-6 text-red-500" />
                          ) : null
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className={`mt-6 p-6 rounded-lg ${
                  selectedAnswers[currentQuestion] === quiz[currentQuestion].correctAnswer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {selectedAnswers[currentQuestion] === quiz[currentQuestion].correctAnswer
                      ? '✓ Correct!'
                      : '✗ Incorrect'}
                  </h3>
                  <p className="text-gray-700">{quiz[currentQuestion].explanation}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    setShowExplanation(selectedAnswers[currentQuestion - 1] !== -1);
                  }
                }}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === -1}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        )}

        {/* Results Step */}
        {step === 'results' && (
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="mb-6">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600 mb-8">Here's how you did:</p>

              {/* Score Display */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 mb-8">
                <div className="text-6xl font-bold text-white mb-2">{percentage}%</div>
                <div className="text-white text-xl">
                  {score} out of {quiz.length} correct
                </div>
              </div>

              {/* Performance Message */}
              <div className="mb-8">
                {percentage >= 80 ? (
                  <p className="text-xl text-gray-700">
                    🎉 Excellent work! You have a strong understanding of {formData.topic}!
                  </p>
                ) : percentage >= 60 ? (
                  <p className="text-xl text-gray-700">
                    👍 Good job! Keep practicing to master {formData.topic}.
                  </p>
                ) : (
                  <p className="text-xl text-gray-700">
                    💪 Keep learning! Review the material and try again.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep('form');
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                    setShowExplanation(false);
                  }}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Take Another Quiz
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setStep('quiz');
                    setShowExplanation(false);
                  }}
                  className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Review Answers
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}