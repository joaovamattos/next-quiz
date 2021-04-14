import { VercelRequest, VercelResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import connectToDatabase from "../../../utils/connectToDatabase";

import { ObjectId } from "mongodb";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { title, difficulty, questions } = req.body;

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

  const user_id = new ObjectId(`${session.userId}`);
  const user = await db.collection("users").findOne({ _id: user_id });

  const collection = db.collection("quizes");

  const o_id = new ObjectId(`${id}`);

  switch (method) {
    case "GET":
      const quiz = await collection.findOne({ _id: o_id });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      return res.status(200).json(quiz);
    case "PUT":
      await collection.findOneAndUpdate(
        { _id: o_id },
        { $set: { title, difficulty, questions } },
        { upsert: true }
      );

      return res.status(200).end();
    case "DELETE":
      try {
        const quiz = await collection.findOne({ _id: o_id });

        if (quiz.user_id.toString() !== user._id.toString()) {
          return res.status(403);
        }

        await collection.findOneAndDelete({ _id: o_id });

        return res.status(200).end();
      } catch (err) {
        return res.status(500).json({
          error: "Error on delete quiz, please try again.",
        });
      }
    default:
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

  data = JSON.stringify(quiz);
  data = JSON.parse(`${data}`);

  return data;
}
