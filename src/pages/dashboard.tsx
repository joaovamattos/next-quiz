import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSession } from "next-auth/client";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

import { Input, Label } from "../styles/global";

import {
  Container,
  Main,
  Header,
  HeaderWrapper,
  Text,
  Button,
  SearchWrapper,
  NoQuiz,
} from "../styles/pages/Dashboard";

export default function Dashboard() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!session && typeof window !== "undefined") {
    router.push("/");
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz</title>
      </Head>

      <Header>
        <Navbar />
        <HeaderWrapper>
          <Text>Estes são os quizes disponíveis.</Text>
          <Link href="/newQuiz">
            <Button>Criar meu próprio quiz</Button>
          </Link>
        </HeaderWrapper>
      </Header>

      <Main>
        <SearchWrapper>
          <Label htmlFor="search">Assunto</Label>
          <Input id="search" type="text" placeholder="Ex. React js" />
        </SearchWrapper>

        <NoQuiz>Ainda não temos nenhum quiz :c</NoQuiz>
      </Main>
    </Container>
  );
}
