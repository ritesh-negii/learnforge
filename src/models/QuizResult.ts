import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuizResult extends Document {
  userId: string;
  quizId: string;
  topic: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: number[];
  completedAt: Date;
}

const QuizResultSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    answers: [Number],
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QuizResult: Model<IQuizResult> =
  mongoose.models.QuizResult || mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);

export default QuizResult;