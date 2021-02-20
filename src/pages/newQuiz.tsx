import { FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { useSession } from "next-auth/client";
import { FiPlus } from "react-icons/fi";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Question from "../components/Question";

import { Label } from "../styles/global";

import {
  Container,
  Main,
  Header,
  HeaderWrapper,
  Title,
  Description,
  Form,
  FormHeader,
  FormTitle,
  Divider,
  InputGroup,
  Input,
  AddButton,
  Select,
  ButtonsWrapper,
  Button,
  CancelButton,
  Fieldset,
} from "../styles/pages/NewQuiz";

const customStyles = {
  menuList: (provided) => ({
    ...provided,
    border: 0,
    background: "#fff",
    padding: 16,
  }),
};
interface Answers {
  answer: string;
  correct: boolean;
}
interface Question {
  question: string;
  answers: Answers[];
}
interface Difficulty {
  label: String;
  value: String;
}
export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      answers: [
        {
          answer: "",
          correct: true,
        },
        {
          answer: "",
          correct: false,
        },
        {
          answer: "",
          correct: false,
        },
        {
          answer: "",
          correct: false,
        },
      ],
    },
  ]);

  const [session, loading] = useSession();
  const router = useRouter();

  const options = [
    { value: "beginner", label: "Iniciante" },
    { value: "medium", label: "Médio" },
    { value: "hard", label: "Difícil" },
  ];

  function addNewQuestion() {
    setQuestions([
      ...questions,
      {
        question: "",
        answers: [
          {
            answer: "",
            correct: true,
          },
          {
            answer: "",
            correct: false,
          },
          {
            answer: "",
            correct: false,
          },
          {
            answer: "",
            correct: false,
          },
        ],
      },
    ]);
  }

  function removeQuestion(question: Question) {
    let newQuestions = [...questions];
    setQuestions(newQuestions.filter((element) => element !== question));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (difficulty === null) {
      return alert("Escolha uma dificuldade para prosseguir!");
    }

    const serializedDifficulty = difficulty?.value;
    const data = {
      title,
      difficulty: serializedDifficulty,
      questions,
    };

    await axios.post("/api/question/new", data);
  }

  function setQuestionValue(position: number, field: string, value: string) {
    const updatedQuestions = questions.map((question, index) => {
      if (index === position) {
        return { ...question, [field]: value };
      }

      return question;
    });

    setQuestions(updatedQuestions);
  }

  function setAnswerValue(
    position: number,
    answerPosition: number,
    value: string
  ) {
    const updatedQuestions = questions.map((question, index) => {
      if (index === position) {
        let newQuestion = { ...question };
        newQuestion.answers[answerPosition].answer = value;
        return newQuestion;
      }

      return question;
    });

    setQuestions(updatedQuestions);
  }

  function setCorrectValue(position: number, answerPosition: number) {
    const updatedQuestions = questions.map((question, index) => {
      if (position === index) {
        question.answers.map((answer, i) => {
          if (i === answerPosition) {
            answer.correct = true;
          }

          if (i !== answerPosition) {
            answer.correct = false;
          }

          return answer;
        });
      }
      return question;
    });

    setQuestions(updatedQuestions);
  }

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
          <Title>Crie um super quiz.</Title>
          <Description>
            Compartilhe seu super quiz com todos os seus amigos.
          </Description>
        </HeaderWrapper>
      </Header>

      <Main>
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <FormHeader>
              <FormTitle>Dados do quiz</FormTitle>
              <Divider />
            </FormHeader>
            <InputGroup>
              <Label htmlFor="title">Título do seu quiz</Label>
              <Input
                type="text"
                placeholder="Ex.: Você sabe tudo de Harry Potter?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="title">Nível de difículdade</Label>
              <Select
                options={options}
                styles={customStyles}
                placeholder="Selecione a dificuldade do seu quiz"
                onChange={(option) => setDifficulty(option)}
              />
            </InputGroup>
          </Fieldset>

          {questions.map((question, index) => {
            return (
              <Question
                key={index}
                question={question}
                index={index}
                setQuestionValue={setQuestionValue}
                setAnswerValue={setAnswerValue}
                removeQuestion={removeQuestion}
                setCorrectValue={setCorrectValue}
              />
            );
          })}

          <AddButton type="button" onClick={addNewQuestion}>
            <FiPlus size={24} color="#556BF4" />
            Nova questão
          </AddButton>

          <ButtonsWrapper>
            <CancelButton>Cancelar</CancelButton>
            <Button>Salvar</Button>
          </ButtonsWrapper>
        </Form>
      </Main>
    </Container>
  );
}
