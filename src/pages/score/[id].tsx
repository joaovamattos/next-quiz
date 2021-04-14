import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

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
import { useEffect, useState } from "react";

export default function Score() {
  const [score, setScore] = useState(null);
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`/api/scores/${router.query.id}`);
      const data = await response.json();
      setScore(data);
    }
    loadData();
  }, [router.query]);

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (!score) {
    return <Loading />;
  }

  if (score.error) {
    router.push("/404");
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz | {score.title}</title>
      </Head>

      <Navbar />
      <Content>
        <Title>{score.title}</Title>

        {score.score.map((s, index) => (
          <ScoreWrapper key={index}>
            <User>{s.user_name}</User>
            <Pontuaition>
              {s.score}/{score.quizLength}
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
