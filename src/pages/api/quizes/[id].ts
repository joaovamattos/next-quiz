import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import connectToDatabase from "../../../utils/connectToDatabase";

import { ObjectId } from "mongodb";

export default async (req: NowRequest, res: NowResponse) => {
  const { title, difficulty, questions } = req.body;

  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });
  console.log(session);

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

      return res.status(200);
    case "DELETE":
      try {
        const quiz = await collection.findOne({ _id: o_id });

        if (quiz.user_id.toString() !== user._id.toString()) {
          return res.status(403);
        }

        await collection.findOneAndDelete({ _id: o_id });

        return res.status(200);
      } catch (err) {
        return res.status(500).json({
          error: "Erro ao deletar quiz, por favor tente novamente mais tarde.",
        });
      }
    default:
      res.end();
      break;
  }
};
