import Head from "next/head";
import { FiGithub, FiArrowRight } from "react-icons/fi";
import { signIn } from "next-auth/client";

import {
  Background,
  Container,
  Navbar,
  Title,
  Wrapper,
  Description,
  RepoLink,
  Button,
} from "../styles/pages/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Quiz</title>
      </Head>
      <Background />
      <Container>
        <Navbar>
          <Title>Next Quiz</Title>

          <a href="https://github.com/joaovamattos/next-quiz" target="_blank">
            <RepoLink>
              <FiGithub size={24} color="#556BF4" />
            </RepoLink>
          </a>
        </Navbar>
        <Wrapper>
          <Description>
            Uma simples plataforma de quiz desenvolvida utilizando Next.js
          </Description>
          <Button onClick={() => signIn()}>
            Comece agora <FiArrowRight size={24} color="#556BF4" />
          </Button>
        </Wrapper>
      </Container>
    </>
  );
}
