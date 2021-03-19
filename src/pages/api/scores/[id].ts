import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import connectToDatabase from "../../../utils/connectToDatabase";

import { ObjectId } from "mongodb";

export default async (req: NowRequest, res: NowResponse) => {
  const { quiz_id, score: pontuaition } = req.body;

  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });
  if (!session) {
    res.status(403);
    return res.json({ error: "Forbidden" });
  }

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = db.collection("quizes");
  const o_id = new ObjectId(`${id}`);
  const quiz = await collection.findOne({ _id: o_id });

  switch (method) {
    case "GET":
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      return res.status(200).json({ score: quiz.score });
    case "PUT":
      let quizes = await collection.findOne({ _id: o_id });

      const data = {
        user_id: session.userId,
        user_name: session.user.name,
        quiz_id,
        createdAt: new Date(),
        score: pontuaition,
      };

      if (!quizes.score || quizes.score.length === 0) {
        let score = [];
        score.push(data);

        await collection.findOneAndUpdate(
          { _id: o_id },
          { $set: { score } },
          { upsert: true }
        );

        return res.status(201).end();
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

        await collection.findOneAndUpdate(
          { _id: o_id },
          { $set: { score: newScore } },
          { upsert: true }
        );

        return res.status(200).end();
      }
    default:
      res.end();
      break;
  }
};

export async function handleGet(id: string) {
  let data = {};
  const db = await connectToDatabase(process.env.DATABASE_URL);
  const collection = db.collection("quizes");
  const o_id = new ObjectId(`${id}`);
  const quiz = await collection.findOne({ _id: o_id });

  if (!quiz) {
    data = { error: "Quiz not found" };
  }

  data = JSON.stringify({
    title: quiz.title,
    score: quiz.score,
  });
  data = JSON.parse(`${data}`);

  return data;
}
