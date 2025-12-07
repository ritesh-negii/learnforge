import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRoadmap extends Document {
  userId: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  title: string;
  phases: {
    week: number;
    title: string;
    topics: string[];
    completed: boolean;
  }[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema: Schema = new Schema(
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
    duration: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    phases: [
      {
        week: Number,
        title: String,
        topics: [String],
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap: Model<IRoadmap> =
  mongoose.models.Roadmap || mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);

export default Roadmap;