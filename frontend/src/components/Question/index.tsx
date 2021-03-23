import React from "react";

import { FiTrash } from "react-icons/fi";

import { Label } from "../../styles/global";
import {
  Fieldset,
  FormHeader,
  FormTitle,
  Divider,
  InputGroup,
  Input,
} from "../../styles/pages/NewQuiz";

import { AnswerWrapper, DeleteButton, Checkbox, CheckboxInput } from "./styles";

interface Answers {
  answer: string;
  correct: boolean;
}
interface Question {
  question: string;
  answers: Answers[];
}

interface QuestionProps {
  index: number;
  question: Question;
  setQuestionValue(position: number, field: string, value: string): void;
  setAnswerValue(position: number, answerPosition: number, value: string): void;
  setCorrectValue(position: number, answerPosition: number): void;
  removeQuestion(question: Question): void;
}

const QuestionForm: React.FC<QuestionProps> = ({
  index,
  question,
  setQuestionValue,
  setAnswerValue,
  setCorrectValue,
  removeQuestion,
}) => {
  return (
    <Fieldset>
      <FormHeader>
        <div>
          <FormTitle>Questão #{index + 1}</FormTitle>
          {index > 0 && (
            <DeleteButton
              type="button"
              onClick={() => removeQuestion(question)}
            >
              <FiTrash size={18} color="#556BF4" />
            </DeleteButton>
          )}
        </div>
        <Divider />
      </FormHeader>
      <InputGroup>
        <Label htmlFor="question">Pergunta</Label>
        <Input
          id="question"
          type="text"
          placeholder="Ex.: Qual o nome do meio do Harry?"
          onChange={(e) => setQuestionValue(index, "question", e.target.value)}
          value={question.question}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="answer">Respostas</Label>
        <AnswerWrapper>
          <Checkbox
            style={question.answers[0].correct ? { background: "#556BF4" } : {}}
          >
            <CheckboxInput
              type="checkbox"
              name={`answers${index}`}
              onChange={() => setCorrectValue(index, 0)}
              checked={question.answers[0].correct}
            />
          </Checkbox>
          <Input
            id="answer"
            type="text"
            placeholder="Ex.: Tiago"
            onChange={(e) => setAnswerValue(index, 0, e.target.value)}
            value={question.answers[0].answer}
            required
          />
        </AnswerWrapper>

        <AnswerWrapper>
          <Checkbox
            style={question.answers[1].correct ? { background: "#556BF4" } : {}}
          >
            <CheckboxInput
              type="checkbox"
              name={`answers${index}`}
              onChange={() => setCorrectValue(index, 1)}
              checked={question.answers[1].correct}
            />
          </Checkbox>
          <Input
            type="text"
            placeholder="Ex.: Black"
            onChange={(e) => setAnswerValue(index, 1, e.target.value)}
            value={question.answers[1].answer}
            required
          />
        </AnswerWrapper>

        <AnswerWrapper>
          <Checkbox
            style={question.answers[2].correct ? { background: "#556BF4" } : {}}
          >
            <CheckboxInput
              type="checkbox"
              name={`answers${index}`}
              onChange={() => setCorrectValue(index, 2)}
              checked={question.answers[2].correct}
            />
          </Checkbox>
          <Input
            type="text"
            placeholder="Ex.: Sirius"
            onChange={(e) => setAnswerValue(index, 2, e.target.value)}
            value={question.answers[2].answer}
            required
          />
        </AnswerWrapper>

        <AnswerWrapper>
          <Checkbox
            style={question.answers[3].correct ? { background: "#556BF4" } : {}}
          >
            <CheckboxInput
              type="checkbox"
              name={`answers${index}`}
              onChange={() => setCorrectValue(index, 3)}
              checked={question.answers[3].correct}
            />
          </Checkbox>
          <Input
            type="text"
            placeholder="Ex.: Lupin"
            onChange={(e) => setAnswerValue(index, 3, e.target.value)}
            value={question.answers[3].answer}
            required
          />
        </AnswerWrapper>
      </InputGroup>
    </Fieldset>
  );
};

export default QuestionForm;
