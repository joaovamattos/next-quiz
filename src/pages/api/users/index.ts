import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../../../utils/connectToDatabase";
import { ObjectId } from "mongodb";

export default async (req: NowRequest, res: NowResponse) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = db.collection("users");
  const users = await collection.find().toArray();

  return res.status(200).json(users);
};

export async function getQuizesByUser(id: string) {
  let data = {};

  const db = await connectToDatabase(process.env.DATABASE_URL);
  const collection = db.collection("quizes");
  const users = db.collection("users");

  const quizes = await collection.find({ user_id: id }).toArray();

  const o_id = new ObjectId(id);
  const user = await users.findOne({ _id: o_id });

  data = JSON.stringify({ user, quizes });
  data = JSON.parse(`${data}`);
  console.log(data);

  return data;
}
