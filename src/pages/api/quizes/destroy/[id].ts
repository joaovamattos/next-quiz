import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
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
  const session = await getSession({ req });

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  const collection = db.collection("quizes");

  try {
    const { query } = useRouter();
    const _id = query.id;
    const quiz = await collection.findOne({ _id });

    if (quiz.user_id !== user._id) {
      return res.status(403);
    }

    await collection.findOneAndDelete({ _id });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao deletar quiz, por favor tente novamente mais tarde.",
    });
  }

  return res.status(200);
};
