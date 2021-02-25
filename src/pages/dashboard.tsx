import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import axios from "axios";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

import { Input, Label } from "../styles/global";

import {
  Container,
  Main,
  Header,
  HeaderWrapper,
  Text,
  Button,
  SearchWrapper,
  NoQuiz,
  QuizesWrapper,
} from "../styles/pages/Dashboard";

export default function Dashboard({ quizes }) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz</title>
      </Head>

      <Header>
        <Navbar />
        <HeaderWrapper>
          <Text>Estes são os quizes disponíveis.</Text>
          <Link href="/newQuiz">
            <Button>Criar meu próprio quiz</Button>
          </Link>
        </HeaderWrapper>
      </Header>

      <Main>
        <SearchWrapper>
          <Label htmlFor="search">Assunto</Label>
          <Input id="search" type="text" placeholder="Ex. React js" />
        </SearchWrapper>
        {quizes ? (
          <QuizesWrapper>
            {quizes.map((quiz) => (
              <Card key={quiz._id} quiz={quiz} />
            ))}
          </QuizesWrapper>
        ) : (
          <NoQuiz>Ainda não temos nenhum quiz :c</NoQuiz>
        )}
      </Main>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const response = await axios.get("/api/quizes");
  // const quizes = response.data;

  const response = await fetch("http://localhost:3000/api/quizes");
  const data = await response.json();

  return {
    props: {
      quizes: data,
    },
    revalidate: 20,
  };
};
