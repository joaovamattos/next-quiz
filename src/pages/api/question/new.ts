import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
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
