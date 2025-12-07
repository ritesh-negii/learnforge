import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import QuizResult from '@/models/QuizResult';

// POST - Save quiz result
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { quizId, topic, score, totalQuestions, percentage, answers } = body;

    await connectDB();

    const result = await QuizResult.create({
      userId,
      quizId,
      topic,
      score,
      totalQuestions,
      percentage,
      answers,
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
  }
}

// GET - Fetch user's quiz results
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const results = await QuizResult.find({ userId })
      .sort({ completedAt: -1 })
      .limit(10);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz results' }, { status: 500 });
  }
}