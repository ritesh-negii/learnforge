

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function safeGenerate(prompt: string, retries = 5): Promise<any | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result;
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Retry if overloaded (503)
    if (retries > 0 && error?.status === 503) {
      const delay = (6 - retries) * 1000; // 1s,2s,3s,4s,5s
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
      return safeGenerate(prompt, retries - 1);
    }

    // Fallback on persistent overload
    if (error?.status === 503) {
      console.log("Falling back to gemini-pro model...");
      const fallback = genAI.getGenerativeModel({ model: "gemini-pro" });
      return fallback.generateContent(prompt);
    }

    return null;
  }
}


// --------------------------------------------------------
// 🚀 Generate Roadmap
// --------------------------------------------------------
export async function generateRoadmap(topic: string, difficulty: string, weeks: number) {
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

const result = await safeGenerate(prompt);
if (!result) throw new Error("Gemini did not return a response");


  if (!result) throw new Error("Gemini did not return a response");

  const text = (await result.response).text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse roadmap JSON");

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

// --------------------------------------------------------
// 🚀 Generate Quiz
// --------------------------------------------------------
export async function generateQuiz(topic: string, difficulty: string, numberOfQuestions: number) {
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
- correctAnswer is the index (0-3)
- Questions should be clear and unambiguous
- Include helpful explanations`;

const result = await safeGenerate(prompt);
if (!result) throw new Error("Gemini did not return a response");


  if (!result) throw new Error("Gemini did not return a response");

  const text = (await result.response).text();

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Failed to parse quiz JSON");

  return JSON.parse(jsonMatch[0]);
}
