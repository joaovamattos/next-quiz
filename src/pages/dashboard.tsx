import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useToast } from "../contexts/toast";
import SelectInput from "react-select";

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
  InputGroup,
  customStyles,
} from "../styles/pages/Dashboard";

interface Difficulty {
  label: String;
  value: String;
}

export default function Dashboard() {
  const [initialQuizes, setInitialQuizes] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [title, setTitle] = useState("");
  const [quizLoading, setQuizLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const { showConfirmToast, showToast, setShowConfirmToast } = useToast();
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      setQuizLoading(true);
      const response = await fetch("/api/quizes");
      const data = await response.json();
      setQuizes(data);
      setInitialQuizes(data);
      setQuizLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (showConfirmToast) {
      showToast("success", "Salvo com sucesso!");
      setShowConfirmToast(false);
    }
  }, [showConfirmToast]);

  useEffect(() => {
    let newQuizes = initialQuizes;

    if (title !== "") {
      newQuizes = newQuizes.filter((element) =>
        element.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (difficulty !== null) {
      newQuizes = newQuizes.filter(
        (element) => element.difficulty === difficulty.value
      );
    }

    setQuizes(newQuizes);
  }, [title, difficulty]);

  const options = [
    { value: "beginner", label: "Iniciante" },
    { value: "medium", label: "Médio" },
    { value: "hard", label: "Difícil" },
  ];

  async function handleDelete(id: string) {
    await fetch(`/api/quizes/${id}`, {
      method: "DELETE",
    });
    const newQuizes = quizes.filter((element) => element._id !== id);
    setQuizes(newQuizes);
    showToast("success", "Quiz apagado com sucesso!");
  }

  if (!session && typeof window !== "undefined") {
    router.push("/signin");
  }

  if (loading || quizLoading) {
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
          <Link href="/quiz">
            <Button>Criar meu próprio quiz</Button>
          </Link>
        </HeaderWrapper>
      </Header>

      <Main>
        <SearchWrapper>
          <InputGroup>
            <Label htmlFor="search">Assunto</Label>
            <Input
              id="search"
              type="text"
              placeholder="Ex. React js"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="select">Nível de difículdade</Label>
            <SelectInput
              options={options}
              styles={customStyles}
              placeholder="Ex.: Iniciante"
              onChange={(option) => setDifficulty(option)}
              isClearable
            />
          </InputGroup>
        </SearchWrapper>
        {quizes.length > 0 ? (
          <QuizesWrapper>
            {quizes.map((quiz) => (
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
