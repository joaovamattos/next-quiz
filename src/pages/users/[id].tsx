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

export default function User() {
  const [data, setData] = useState(null);

  const [session] = useSession();
  const router = useRouter();
  const { showConfirmToast, showToast, setShowConfirmToast } = useToast();

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`/api/users/${router.query.id}`);
      const responseData = await response.json();
      setData(responseData);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (showConfirmToast) {
      showToast("success", "Salvo com sucesso!");
      setShowConfirmToast(false);
    }
  }, [showConfirmToast]);

  function formatDate(date: string) {
    if (data !== null) {
      const newDate = new Date(date).toISOString();
      const rezoned = DateTime.fromISO(newDate).setZone("America/Manaus");
      return rezoned.toLocaleString({
        month: "long",
        year: "numeric",
      });
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/quizes/${id}`, {
      method: "DELETE",
    });
    const newQuizes = data.quizes.filter((element) => element._id !== id);
    setData({ ...data, quizes: newQuizes });
    showToast("success", "Quiz apagado com sucesso!");
  }

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (!data) {
    return <Loading />;
  }

  if (data.error) {
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
          <Avatar src={data?.user.image} alt={data?.user.name} />
          <Username>{data?.user.name}</Username>
          <DescriptionWrapper>
            <FiCalendar size={16} color="#556BF4" />
            <Text>Desde {formatDate(data?.user.createdAt)}</Text>
          </DescriptionWrapper>
          <DescriptionWrapper>
            <FiCheckSquare size={16} color="#556BF4" />
            <Text>{`${data?.quizes.length} ${
              data?.quizes.length === 1 ? "quiz criado" : "quizes criados"
            }`}</Text>
          </DescriptionWrapper>
        </HeaderWrapper>
      </Header>

      <Main>
        {data?.quizes.length > 0 ? (
          <QuizesWrapper>
            {data?.quizes.map((quiz) => (
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
