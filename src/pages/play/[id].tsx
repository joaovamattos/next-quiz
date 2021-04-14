import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import {
  Container,
  Content,
  ProgressWrapper,
  ProgressText,
  Progressbar,
  Progress,
  Question,
  AnswersWrapper,
  Button,
} from "../../styles/pages/Play";

export default function Play() {
  const [quiz, setQuiz] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    async function loadQuiz() {
      if (router.query && router.query.id) {
        setLoading(true);
        const response = await fetch(`/api/quizes/${router.query.id}`);
        const data = await response.json();
        setQuiz(data);
        setProgress((1 / data.questions?.length - questionNumber) * 100);
        setLoading(false);
      }
    }
    loadQuiz();
  }, [router.query]);

  useEffect(() => {
    if (questionNumber + 1 > quiz?.questions?.length) {
      handleSubmit();
    }
  }, [questionNumber]);

  const handleSubmit = useCallback(async () => {
    const data = {
      user_id: quiz.user_id,
      user_name: quiz.user_name,
      quiz_id: quiz._id,
      score,
    };

    await fetch(`/api/scores/${router.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(true);
    router.push(`/score/${quiz?._id}`);
  }, [score]);

  const handleNext = useCallback(
    (answer) => {
      setAnswered(true);

      if (answer.correct) {
        setScore(score + 1);
      }

      setTimeout(() => {
        setAnswered(false);
        setProgress(
          (1 / (quiz?.questions.length - (questionNumber + 1))) * 100
        );
        setQuestionNumber(questionNumber + 1);
      }, 1000);
    },

    [score, quiz, questionNumber, progress]
  );

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (loading || questionNumber + 1 > quiz?.questions?.length) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz | {quiz?.title}</title>
      </Head>
      <Navbar />
      <Content>
        <ProgressWrapper>
          <ProgressText>
            Pergunta {questionNumber + 1} de {quiz?.questions.length}
          </ProgressText>
          <Progressbar>
            <Progress percent={progress} />
          </Progressbar>
        </ProgressWrapper>

        <Question>{quiz?.questions[questionNumber]?.question}</Question>

        <AnswersWrapper>
          <Button
            answered={answered}
            disabled={answered}
            correct={quiz?.questions[questionNumber]?.answers[0].correct}
            onClick={() =>
              handleNext(quiz?.questions[questionNumber]?.answers[0])
            }
          >
            {quiz?.questions[questionNumber]?.answers[0]?.answer}
          </Button>
          <Button
            answered={answered}
            disabled={answered}
            correct={quiz?.questions[questionNumber]?.answers[1].correct}
            onClick={() =>
              handleNext(quiz?.questions[questionNumber]?.answers[1])
            }
          >
            {quiz?.questions[questionNumber]?.answers[1]?.answer}
          </Button>
          <Button
            answered={answered}
            disabled={answered}
            correct={quiz?.questions[questionNumber]?.answers[2].correct}
            onClick={() =>
              handleNext(quiz?.questions[questionNumber]?.answers[2])
            }
          >
            {quiz?.questions[questionNumber]?.answers[2]?.answer}
          </Button>
          <Button
            answered={answered}
            disabled={answered}
            correct={quiz?.questions[questionNumber]?.answers[3].correct}
            onClick={() =>
              handleNext(quiz?.questions[questionNumber]?.answers[3])
            }
          >
            {quiz?.questions[questionNumber]?.answers[3]?.answer}
          </Button>
        </AnswersWrapper>
      </Content>
    </Container>
  );
}
