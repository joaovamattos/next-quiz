import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { handleGet } from "../api/scores/[id]";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

import {
  Container,
  Content,
  Title,
  ScoreWrapper,
  User,
  Pontuaition,
  Button,
  OutlineButton,
} from "../../styles/pages/Score";

export default function Score({ staticScore }) {
  const [session] = useSession();
  const router = useRouter();
  const { isFallback } = useRouter();

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (isFallback) {
    return <Loading />;
  }

  if (!staticScore || staticScore.error) {
    router.push("/404");
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz | {staticScore.title}</title>
      </Head>

      <Navbar />
      <Content>
        <Title>{staticScore.title}</Title>

        {staticScore.score.map((score, index) => (
          <ScoreWrapper key={index}>
            <User>{score.user_name}</User>
            <Pontuaition>
              {score.score}/{staticScore.quizLength}
            </Pontuaition>
          </ScoreWrapper>
        ))}

        <Link href={`/play/${router.query.id}`}>
          <a>
            <Button>Tentar novamente</Button>
          </a>
        </Link>

        <Link href="/dashboard">
          <a>
            <OutlineButton>Voltar ao início</OutlineButton>
          </a>
        </Link>
      </Content>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://next-quiz-6c5vuaarz-joaovamattos.vercel.app/api/quizes"
  );
  const data = await response.json();

  const paths = data.map((element) => {
    return { params: { id: element._id } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const data = await handleGet(id.toString());

  return {
    props: {
      staticScore: data,
    },
    revalidate: 20,
  };
};
