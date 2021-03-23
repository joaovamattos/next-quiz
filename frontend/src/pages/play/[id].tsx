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

export default function Play({ staticQuiz }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [progress, setProgress] = useState(
    (1 / staticQuiz.questions?.length - questionNumber) * 100
  );
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [session] = useSession();
  const router = useRouter();
  const { isFallback } = useRouter();

  useEffect(() => {
    if (questionNumber + 1 > staticQuiz?.questions?.length) {
      handleSubmit();
    }
  }, [questionNumber]);

  const handleSubmit = useCallback(async () => {
    const data = {
      user_id: staticQuiz.user_id,
      user_name: staticQuiz.user_name,
      quiz_id: staticQuiz._id,
      scores: score,
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/scores/${router.query.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    setLoading(true);
    router.push(`/score/${staticQuiz?._id}`);
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
          (1 / (staticQuiz?.questions.length - (questionNumber + 1))) * 100
        );
        setQuestionNumber(questionNumber + 1);
      }, 1000);
    },

    [score, staticQuiz, questionNumber, progress]
  );

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (
    isFallback ||
    loading ||
    questionNumber + 1 > staticQuiz?.questions?.length
  ) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz | {staticQuiz?.title}</title>
      </Head>
      <Navbar />
      <Content>
        <ProgressWrapper>
          <ProgressText>
            Pergunta {questionNumber + 1} de {staticQuiz?.questions.length}
          </ProgressText>
          <Progressbar>
            <Progress percent={progress} />
          </Progressbar>
        </ProgressWrapper>

        <Question>{staticQuiz?.questions[questionNumber]?.question}</Question>

        <AnswersWrapper>
          <Button
            answered={answered}
            disabled={answered}
            correct={staticQuiz?.questions[questionNumber]?.answers[0].correct}
            onClick={() =>
              handleNext(staticQuiz?.questions[questionNumber]?.answers[0])
            }
          >
            {staticQuiz?.questions[questionNumber]?.answers[0]?.answer}
          </Button>
          <Button
            answered={answered}
            disabled={answered}
            correct={staticQuiz?.questions[questionNumber]?.answers[1].correct}
            onClick={() =>
              handleNext(staticQuiz?.questions[questionNumber]?.answers[1])
            }
          >
            {staticQuiz?.questions[questionNumber]?.answers[1]?.answer}
          </Button>
          <Button
            answered={answered}
            disabled={answered}
            correct={staticQuiz?.questions[questionNumber]?.answers[2].correct}
            onClick={() =>
              handleNext(staticQuiz?.questions[questionNumber]?.answers[2])
            }
          >
            {staticQuiz?.questions[questionNumber]?.answers[2]?.answer}
          </Button>
          <Button
            answered={answered}
            disabled={answered}
            correct={staticQuiz?.questions[questionNumber]?.answers[3].correct}
            onClick={() =>
              handleNext(staticQuiz?.questions[questionNumber]?.answers[3])
            }
          >
            {staticQuiz?.questions[questionNumber]?.answers[3]?.answer}
          </Button>
        </AnswersWrapper>
      </Content>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizes`);
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
    `${process.env.NEXT_PUBLIC_API_URL}/quizes/${id}`
  );
  const data = await response.json();

  return {
    props: {
      staticQuiz: data,
    },
    revalidate: 20,
  };
};
