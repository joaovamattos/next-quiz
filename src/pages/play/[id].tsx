import { GetStaticProps, GetStaticPaths } from "next";

import Navbar from "../../components/Navbar";
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
  return (
    <Container>
      <Navbar />
      <Content>
        <ProgressWrapper>
          <ProgressText>Pergunta 1 de 5</ProgressText>
          <Progressbar>
            <Progress percent={20} />
          </Progressbar>
        </ProgressWrapper>

        <Question>As tags HTML são envolvidas por quais caracteres?</Question>

        <AnswersWrapper>
          <Button>{"<>"}</Button>
          <Button>{"{}"}</Button>
          <Button>{"()"}</Button>
          <Button>{"[]"}</Button>
        </AnswersWrapper>
      </Content>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:3000/api/quizes");
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
    `http://localhost:3000/api/quizes/${id.toString()}`
  );

  let data = {};
  if (response.statusText) {
    data = { error: "not found" };
  } else {
    data = await response.json();
  }

  return {
    props: {
      staticQuiz: data,
    },
    revalidate: 20,
  };
};
