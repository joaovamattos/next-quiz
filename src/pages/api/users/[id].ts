import { VercelRequest, VercelResponse } from "@vercel/node";
import connectToDatabase from "../../../utils/connectToDatabase";

import { ObjectId } from "mongodb";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;
  let data = {};

  const db = await connectToDatabase(process.env.DATABASE_URL);
  const collection = db.collection("quizes");
  const users = db.collection("users");

  const o_id = new ObjectId(id.toString());
  const quizes = await collection.find({ user_id: o_id }).toArray();
  const user = await users.findOne({ _id: o_id });

  data = JSON.stringify({ user, quizes });
  data = JSON.parse(`${data}`);

  return res.status(200).json(data);
};
