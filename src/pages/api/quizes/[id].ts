import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import { MongoClient, Db, ObjectId } from "mongodb";
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
  const { title, difficulty, questions } = req.body;

  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });

  if (!session) {
    res.status(403);
  }

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const user_id = new ObjectId(`${session?.userId}`);
  const user = await db.collection("users").findOne({ _id: user_id });

  const collection = db.collection("quizes");
  const o_id = new ObjectId(`${id}`);

  switch (method) {
    case "GET":
      const quiz = await collection.findOne({ _id: o_id });

      if (!quiz) {
        return res.status(404);
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
          return res.status(403).end();
        }

        await collection.findOneAndDelete({ _id: o_id });

        return res.status(200).end();
      } catch (err) {
        return res.status(500).json({
          error: "Erro ao deletar quiz, por favor tente novamente mais tarde.",
        });
      }
  }
};
