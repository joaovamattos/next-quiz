interface Answers {
  answer: string;
  correct: boolean;
}

interface Question {
  question: string;
  answers: Answers[];
}

interface Quiz {
  _id: string;
  user_id: string;
  user_name: string;
  user_image: string;
  user_email: string;
  title: string;
  difficulty: string;
  questions: Question[];
  createdAt: string;
}

interface CardProps {
  quiz: Quiz;
  handleDelete(id: string): void;
}

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import { FiArrowRight, FiEdit, FiTrash2, FiAlertCircle } from "react-icons/fi";
import { useSession } from "next-auth/client";

import {
  Container,
  CardHeader,
  Avatar,
  Username,
  CreatedAt,
  Title,
  StartButton,
  CardFooter,
  Button,
  ActionsWrapper,
} from "./styles";

const Card: React.FC<CardProps> = ({ quiz, handleDelete }) => {
  const [session] = useSession();
  const [isWarning, setIsWarning] = useState(false);

  function formatDate(date: string) {
    const rezoned = DateTime.fromISO(date).setZone("America/Manaus");
    return rezoned.toLocaleString();
  }

  useEffect(() => {
    isWarning &&
      setTimeout(() => {
        setIsWarning(false);
      }, 2000);
  }, [isWarning]);

  const handleDel = useCallback(
    (id) => {
      if (isWarning === false) {
        setIsWarning(true);
        return;
      }

      handleDelete(id);
    },
    [isWarning]
  );

  return (
    <Container>
      <CardHeader>
        <Avatar src={quiz.user_image} alt={quiz.user_name} />
        <div>
          <Link href={`/users/${quiz.user_id}`}>
            <a>
              <Username>{quiz.user_name}</Username>
            </a>
          </Link>
          <CreatedAt>{formatDate(quiz.createdAt)}</CreatedAt>
        </div>
      </CardHeader>
      <Title>{quiz.title}</Title>
      <CardFooter>
        <Link href={`/play/${quiz._id}`}>
          <StartButton type="button">
            Iniciar agora
            <FiArrowRight size={18} color="#2F2E41" />
          </StartButton>
        </Link>

        {session?.userId === quiz.user_id && (
          <ActionsWrapper>
            <Link href={`/quiz/${quiz._id}`}>
              <Button type="button">
                <FiEdit size={18} color="#2F2E41" />
              </Button>
            </Link>

            <Button type="button" onClick={() => handleDel(quiz._id)}>
              {isWarning ? (
                <FiAlertCircle size={18} color="#C23933" />
              ) : (
                <FiTrash2 size={18} color="#2F2E41" />
              )}
            </Button>
          </ActionsWrapper>
        )}
      </CardFooter>
    </Container>
  );
};

export default Card;
