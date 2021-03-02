import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
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
  const {
    query: { id },
    method,
  } = req;
  const session = await getSession({ req });

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  const collection = db.collection("quizes");

  const o_id = new ObjectId(`${id}`);
  switch (method) {
    case "GET":
      const quiz = await collection.find({ _id: o_id }).toArray();

      if (!quiz) {
        return res.status(404);
      }

      return res.status(200).json(quiz[0]);
    case "PUT":
      await collection.findOneAndUpdate({ _id: o_id }, {});
      return;
    case "DELETE":
      try {
        const quiz = await collection.find({ _id: o_id }).toArray();

        if (quiz?.[0].user_id !== user._id) {
          return res.status(403);
        }

        await collection.deleteOne({ _id: o_id });

        return res.status(200);
      } catch (err) {
        return res.status(500).json({
          error: "Erro ao deletar quiz, por favor tente novamente mais tarde.",
        });
      }
  }
};
