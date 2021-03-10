import { NowRequest, NowResponse } from "@vercel/node";

import connectToDatabase from "../../../utils/connectToDatabase";

export default async (req: NowRequest, res: NowResponse) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = db.collection("quizes");

  const quizes = await collection.find().toArray();

  return res.status(200).json(quizes);
};
