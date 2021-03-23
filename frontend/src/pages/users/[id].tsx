import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { DateTime } from "luxon";
import { FiCalendar, FiCheckSquare } from "react-icons/fi";

import { useToast } from "../../contexts/toast";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Card from "../../components/Card";

import {
  Container,
  Main,
  Header,
  Avatar,
  Username,
  Text,
  HeaderWrapper,
  QuizesWrapper,
  NoQuiz,
  DescriptionWrapper,
} from "../../styles/pages/User";

export default function User({ data: sData }) {
  let staticData = sData;
  const [data, setData] = useState(staticData);

  const [session] = useSession();
  const router = useRouter();
  const { isFallback } = useRouter();
  const { showConfirmToast, showToast, setShowConfirmToast } = useToast();

  useEffect(() => {
    if (showConfirmToast) {
      showToast("success", "Salvo com sucesso!");
      setShowConfirmToast(false);
    }
  }, [showConfirmToast]);

  function formatDate(date: string) {
    const newDate = new Date(date).toISOString();
    const rezoned = DateTime.fromISO(newDate).setZone("America/Manaus");
    return rezoned.toLocaleString({
      month: "long",
      year: "numeric",
    });
  }

  async function handleDelete(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizes/${id}`, {
      method: "DELETE",
    });
    const newQuizes = data.quizes.filter((element) => element._id !== id);
    setData({ ...data, quizes: newQuizes });
    showToast("success", "Quiz apagado com sucesso!");
  }

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (isFallback) {
    return <Loading />;
  }

  if (!staticData || staticData.error) {
    router.push("/404");
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz</title>
      </Head>

      <Header>
        <Navbar />
        <HeaderWrapper>
          <Avatar src={data.user.image} alt={data.user.name} />
          <Username>{data.user.name}</Username>
          <DescriptionWrapper>
            <FiCalendar size={16} color="#556BF4" />
            <Text>Desde {formatDate(data.user.createdAt)}</Text>
          </DescriptionWrapper>
          <DescriptionWrapper>
            <FiCheckSquare size={16} color="#556BF4" />
            <Text>{`${data.quizes.length} ${
              data.quizes.length === 1 ? "quiz criado" : "quizes criados"
            }`}</Text>
          </DescriptionWrapper>
        </HeaderWrapper>
      </Header>

      <Main>
        {data.quizes.length > 0 ? (
          <QuizesWrapper>
            {data.quizes.map((quiz) => (
              <Card key={quiz._id} quiz={quiz} handleDelete={handleDelete} />
            ))}
          </QuizesWrapper>
        ) : (
          <NoQuiz>Nenhum quiz encontrado! :c</NoQuiz>
        )}
      </Main>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 20,
  };
};
