import { NowRequest, NowResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";
import url from "url";

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);
  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (req: NowRequest, res: NowResponse) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = db.collection("quizes");

  const quizes = await collection.find().toArray();

  return res.status(200).json(quizes);
};
