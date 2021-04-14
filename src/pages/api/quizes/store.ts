import { VercelRequest, VercelResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import connectToDatabase from "../../../utils/connectToDatabase";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { title, difficulty, questions } = req.body;
  const session = await getSession({ req });

  const db = await connectToDatabase(process.env.DATABASE_URL);
  const collection = db.collection("quizes");

  try {
    await collection.insertOne({
      user_id: session.userId,
      user_name: session.user.name,
      user_image: session.user.image,
      title,
      difficulty,
      questions,
      createdAt: new Date(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error on save quiz, please try again.",
    });
  }

  return res.status(201).end();
};
