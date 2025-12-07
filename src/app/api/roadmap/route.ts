import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Roadmap from '@/models/Roadmap';

// GET - Fetch user's roadmaps
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const roadmaps = await Roadmap.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ roadmaps });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmaps' }, { status: 500 });
  }
}

// POST - Create new roadmap
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { topic, difficulty, duration, title, phases } = body;

    await connectDB();

    const roadmap = await Roadmap.create({
      userId,
      topic,
      difficulty,
      duration,
      title,
      phases,
      progress: 0,
    });

    return NextResponse.json({ roadmap }, { status: 201 });
  } catch (error) {
    console.error('Error creating roadmap:', error);
    return NextResponse.json({ error: 'Failed to create roadmap' }, { status: 500 });
  }
}