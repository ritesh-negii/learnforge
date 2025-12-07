import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuiz extends Document {
  userId: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);

export default Quiz;