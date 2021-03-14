// import { GetStaticProps, GetStaticPaths } from "next";
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
  const [loading, setLoading] = useState(false);
  const [answered, setAnswered] = useState(false);

  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    async function loadQuiz() {
      if (router.query && router.query.id) {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/quizes/${router.query.id}`
        );
        const data = await response.json();
        setQuiz(data);
        setProgress((1 / data.questions.length - questionNumber) * 100);
        setLoading(false);
      }
    }
    loadQuiz();
  }, [router.query]);

  const handleSubmit = useCallback(
    (answer) => {
      setAnswered(true);
      setInterval(() => {
        if (answer.correct) {
          setScore(score + 1);
        }

        if (questionNumber + 1 === quiz?.questions.length) {
          setInterval(() => {
            setLoading(true);
            // call api -> save score
            router.push("/classification");
          }, 1000);
        } else {
          setProgress(
            (1 / (quiz?.questions.length - (questionNumber + 1))) * 100
          );
          setQuestionNumber(questionNumber + 1);
          setAnswered(false);
        }
      }, 1000);

      if (questionNumber + 1 === quiz?.questions.length) {
      }
    },
    [quiz, questionNumber, progress]
  );

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
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
            correct={quiz?.questions[questionNumber]?.answers[0].correct}
            onClick={() =>
              handleSubmit(quiz?.questions[questionNumber]?.answers[0])
            }
          >
            {quiz?.questions[questionNumber]?.answers[0]?.answer}
          </Button>
          <Button
            answered={answered}
            correct={quiz?.questions[questionNumber]?.answers[1].correct}
            onClick={() =>
              handleSubmit(quiz?.questions[questionNumber]?.answers[1])
            }
          >
            {quiz?.questions[questionNumber]?.answers[1]?.answer}
          </Button>
          <Button
            answered={answered}
            correct={quiz?.questions[questionNumber]?.answers[2].correct}
            onClick={() =>
              handleSubmit(quiz?.questions[questionNumber]?.answers[2])
            }
          >
            {quiz?.questions[questionNumber]?.answers[2]?.answer}
          </Button>
          <Button
            answered={answered}
            correct={quiz?.questions[questionNumber]?.answers[3].correct}
            onClick={() =>
              handleSubmit(quiz?.questions[questionNumber]?.answers[3])
            }
          >
            {quiz?.questions[questionNumber]?.answers[3]?.answer}
          </Button>
        </AnswersWrapper>
      </Content>
    </Container>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch("http://localhost:3000/api/quizes");
//   const data = await response.json();

//   const paths = data.map((element) => {
//     return { params: { id: element._id } };
//   });

//   console.log(paths);

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params;

//   const response = await fetch(`http://localhost:3000/api/quizes/${id}`);
//   const data = await response.json();
//   return {
//     props: {
//       staticQuiz: data,
//     },
//     revalidate: 20,
//   };
// };
