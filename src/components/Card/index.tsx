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
}

import React from "react";
import { DateTime } from "luxon";
import { FiArrowRight, FiEdit, FiTrash2 } from "react-icons/fi";
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

const Card: React.FC<CardProps> = ({ quiz }) => {
  const [session] = useSession();

  function formatDate(date: string) {
    const rezoned = DateTime.fromISO(date).setZone("America/Manaus");
    return rezoned.toLocaleString();
  }

  return (
    <Container>
      <CardHeader>
        <Avatar src={quiz.user_image} alt={quiz.user_name} />
        <div>
          <Username>{quiz.user_name}</Username>
          <CreatedAt>{formatDate(quiz.createdAt)}</CreatedAt>
        </div>
      </CardHeader>
      <Title>{quiz.title}</Title>
      <CardFooter>
        <StartButton type="button">
          Iniciar agora
          <FiArrowRight size={18} color="#2F2E41" />
        </StartButton>

        {session.user.image === quiz.user_image && (
          <ActionsWrapper>
            <Button type="button">
              <FiEdit size={18} color="#2F2E41" />
            </Button>
            <Button type="button">
              <FiTrash2 size={18} color="#2F2E41" />
            </Button>
          </ActionsWrapper>
        )}
      </CardFooter>
    </Container>
  );
};

export default Card;
