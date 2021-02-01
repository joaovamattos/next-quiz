import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

import { FiGithub, FiArrowRight } from "react-icons/fi";

import Loading from "../components/Loading";

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
  const [session, loading] = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  if (loading) {
    return <Loading />;
  }

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
