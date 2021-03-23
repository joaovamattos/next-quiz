import { Document, Schema, model } from "mongoose";

interface Answers {
  answer: string;
  correct: boolean;
}

interface Question {
  question: string;
  answers: Answers[];
}

interface Score {
  user_id: string;
  user_name: string;
  quiz_id: string;
  createdAt: string;
  score: number;
}

interface QuizModel extends Document {
  _id: string;
  user_id: string;
  user_name: string;
  user_image: string;
  title: string;
  difficulty: string;
  questions: Array<Question>;
  createdAt: string;
  score: Array<Score>;
}

const QuizSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answers: [
        {
          answer: {
            type: String,
            required: true,
          },
          correct: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: String,
    required: true,
  },
  score: [
    {
      user_id: {
        type: String,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      quiz_id: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default model<QuizModel>("Quizes", QuizSchema);
