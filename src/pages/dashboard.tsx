import Head from "next/head";
import { useRouter } from "next/router";

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
          <Button onClick={() => {}}>Criar meu próprio quiz</Button>
        </HeaderWrapper>
      </Header>

      <Main>
        <SearchWrapper>
          <Label htmlFor="search">Assunto</Label>
          <Input type="text" placeholder="Ex. React js" />
        </SearchWrapper>

        <h2>Ainda não temos nenhum quiz :c</h2>
      </Main>
    </Container>
  );
}
