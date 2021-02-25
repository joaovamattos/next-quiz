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
import { FiArrowRight } from "react-icons/fi";

import {
  Container,
  CardHeader,
  Avatar,
  Username,
  CreatedAt,
  Title,
  StartButton,
} from "./styles";

const Card: React.FC<CardProps> = ({ quiz }) => {
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
      <StartButton>
        Iniciar agora
        <FiArrowRight size={24} color="#2F2E41" />
      </StartButton>
    </Container>
  );
};

export default Card;
