import { FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { FiPlus } from "react-icons/fi";

import { useToast } from "../contexts/toast";
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

export default function Quiz() {
  const [headTitle, setHeadTitle] = useState("Novo quiz");
  const [pageTitle, setPageTitle] = useState("Crie um super quiz.");
  const [pageDescription, setPageDescription] = useState(
    "Compartilhe seu super quiz com todos os seus amigos."
  );
  const [pageLoading, setPageLoading] = useState(false);

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
  const { showToast, setShowConfirmToast } = useToast();
  const router = useRouter();

  const options = [
    { value: "beginner", label: "Iniciante" },
    { value: "medium", label: "Médio" },
    { value: "hard", label: "Difícil" },
  ];

  useEffect(() => {
    async function loadQuiz() {
      if (router.query && router.query.id) {
        setPageLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/quizes/${router.query.id}`
        );
        const data = await response.json();

        setHeadTitle("Editar quiz");
        setPageTitle("Edite seu super quiz.");
        setPageDescription("Deixe seu quiz do jeitinho que ele tem de ser.");
        setTitle(data.title);
        const option = options.filter(
          (element) => element.value === data.difficulty
        );
        setDifficulty(option[0]);
        setQuestions(data.questions);
        setPageLoading(false);
      }
    }
    loadQuiz();
  }, [router.query]);

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

    try {
      if (router.query && router.query.id) {
        await fetch(`/api/quizes/${router.query.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/quizes/store", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      setShowConfirmToast(true);
      router.push("/dashboard");
    } catch (error) {
      showToast("error", "Erro ao salvar quiz, por favor tente novamente!");
    }
  }

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

  if (loading || pageLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>{headTitle}</title>
      </Head>

      <Header>
        <Navbar />
        <HeaderWrapper>
          <Title>{pageTitle}</Title>
          <Description>{pageDescription}</Description>
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
                id="title"
                type="text"
                placeholder="Ex.: Você sabe tudo de Harry Potter?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="select">Nível de difículdade</Label>
              <Select
                id="select"
                options={options}
                styles={customStyles}
                placeholder="Selecione a dificuldade do seu quiz"
                value={difficulty}
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
            <CancelButton type="button" onClick={() => router.back()}>
              Cancelar
            </CancelButton>
            <Button>Salvar</Button>
          </ButtonsWrapper>
        </Form>
      </Main>
    </Container>
  );
}
