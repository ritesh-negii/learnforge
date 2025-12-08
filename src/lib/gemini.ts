import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateRoadmap(topic: string, difficulty: string, weeks: number) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });


  const prompt = `Create a detailed ${weeks}-week learning roadmap for "${topic}" at ${difficulty} level.

Return a JSON object with this exact structure (no markdown, just raw JSON):
{
  "title": "Topic Learning Path",
  "phases": [
    {
      "week": 1,
      "title": "Phase title",
      "topics": ["topic 1", "topic 2", "topic 3", "topic 4"]
    }
  ]
}

Requirements:
- Create exactly ${weeks} phases (one per week)
- Each phase should have 4-5 specific, actionable topics
- Topics should be progressive and build on each other
- For ${difficulty} level learners
- Be specific and practical`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from response (remove markdown if present)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to generate valid roadmap');
  }
  
  const roadmapData = JSON.parse(jsonMatch[0]);
  
  return {
    title: roadmapData.title,
    topic,
    difficulty,
    duration: weeks,
    phases: roadmapData.phases.map((phase: any) => ({
      ...phase,
      completed: false
    }))
  };
}

export async function generateQuiz(topic: string, difficulty: string, numberOfQuestions: number) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });


  const prompt = `Generate ${numberOfQuestions} multiple-choice quiz questions about "${topic}" at ${difficulty} level.

Return a JSON array with this exact structure (no markdown, just raw JSON):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Explanation why this answer is correct"
  }
]

Requirements:
- Create exactly ${numberOfQuestions} questions
- Each question must have exactly 4 options
- correctAnswer is the index (0-3) of the correct option
- Questions should be clear and unambiguous
- For ${difficulty} level
- Include helpful explanations`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Failed to generate valid quiz');
  }
  
  const questions = JSON.parse(jsonMatch[0]);
  return questions;
}