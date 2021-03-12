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
            <Progress percent={25} />
          </Progressbar>
        </ProgressWrapper>

        <Question>{staticQuiz?.question}</Question>

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

  const response = await fetch(`http://localhost:3000/api/quizes/${id}`);
  const data = await response.json();
  console.log("------------------------------------------------------");
  console.log(data);

  return {
    props: {
      staticQuiz: data,
    },
    revalidate: 20,
  };
};
