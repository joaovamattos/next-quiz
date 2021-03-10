import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import connectToDatabase from "../../../utils/connectToDatabase";

export default async (req: NowRequest, res: NowResponse) => {
  const { title, difficulty, questions } = req.body;
  const session = await getSession({ req });

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });
  const collection = db.collection("quizes");

  try {
    await collection.insertOne({
      user_id: user._id,
      user_name: session.user.name,
      user_image: session.user.image,
      user_email: session.user.email,
      title,
      difficulty,
      questions,
      createdAt: new Date(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao cadastrar quiz, por favor tente novamente mais tarde.",
    });
  }

  return res.status(201);
};
