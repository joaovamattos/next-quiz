import { Request, Response } from "express";

import Quiz from "../../models/Quiz";

class QuizController {
  async store(req: Request, res: Response) {
    const {
      title,
      difficulty,
      questions,
      user_id,
      user_name,
      user_image,
    } = req.body;

    const quiz = await Quiz.create({
      title,
      difficulty,
      questions,
      user_id,
      user_name,
      user_image,
      createdAt: new Date().toISOString(),
    });

    return res.json(quiz);
  }

  async index(req: Request, res: Response) {
    const quizes = await Quiz.find();

    return res.status(200).json(quizes);
  }

  async update(req: Request, res: Response) {
    const {
      title,
      difficulty,
      questions,
      user_id,
      user_name,
      user_image,
    } = req.body;
    const { id } = req.params;

    const quiz = await Quiz.findOne({ _id: id });
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

    quiz.title = title;
    quiz.difficulty = difficulty;
    quiz.questions = questions;
    quiz.user_id = user_id;
    quiz.user_name = user_name;
    quiz.user_image = user_image;

    await quiz.save();

    return res.json({ quiz });
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const quiz = await Quiz.findOne({ _id: id });

    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

    await Quiz.findOneAndDelete({ _id: id });
    return res.sendStatus(204);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const quiz = await Quiz.findOne({ _id: id });

    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

    return res.json(quiz);
  }
}

export default QuizController;
