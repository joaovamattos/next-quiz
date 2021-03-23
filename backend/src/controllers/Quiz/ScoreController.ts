import { Request, Response } from "express";

import Quiz from "../../models/Quiz";

class ScoreController {
  async update(req: Request, res: Response) {
    const { scores, user_id, user_name, quiz_id } = req.body;
    const { id } = req.params;

    const quiz = await Quiz.findOne({ _id: id });

    const data = {
      user_id,
      user_name,
      quiz_id,
      createdAt: new Date().toString(),
      score: scores,
    };

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (!quiz.score || quiz.score.length < 1) {
      let score = [];
      score.push(data);

      quiz.score = score;
      await quiz.save();

      return res.status(201);
    } else {
      let aux = 0;
      let newScore = quiz.score;

      newScore.forEach((element) => {
        if (element.score > aux) {
          aux = element.score;
        }
      });

      let index = 0;
      newScore.forEach((element) => {
        if (element.score !== aux && element.score >= aux) {
          index = newScore.indexOf(element);
        }
      });

      if (newScore.length < 5) {
        newScore.splice(index + 1, 0, data);
      } else {
        newScore.splice(index - 1, 1, data);
      }

      newScore.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      });

      quiz.score = newScore;
      await quiz.save();

      return res.status(200).end();
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const quiz = await Quiz.findOne({ _id: id });

    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

    return res.json({ score: quiz.score, quizLength: quiz.questions.length });
  }
}

export default ScoreController;
