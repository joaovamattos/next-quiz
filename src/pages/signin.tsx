import Head from "next/head";
import { providers, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { FiGithub } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";

import Link from "next/link";
import {
  Container,
  LoginWrapper,
  WelcomeWrapper,
  Button,
  Subtitle,
  Title,
  Description,
  Navbar,
  Image,
  InputWrapper,
  WelcomeTitle,
  WelcomeSubtitle,
} from "../styles/pages/Signin";

interface Provider {
  id: string;
  name: string;
}
export default function SignIn({ providers }) {
  const [session] = useSession();
  const router = useRouter();

  if (session && typeof window !== "undefined") {
    router.push("/dashboard");
  }

  return (
    <Container>
      <Head>
        <title>Next Quiz | Entrar</title>
      </Head>
      <LoginWrapper>
        <Navbar>
          <Link href="/">
            <a>
              <Title>Next Quiz</Title>
            </a>
          </Link>
        </Navbar>
        <InputWrapper>
          <div>
            <Subtitle>Entrar.</Subtitle>
            <Description>Faça login para continuar.</Description>
          </div>
          {Object.values(providers).map((provider: Provider) => (
            <div key={provider?.name}>
              <Button onClick={() => signIn(provider?.id)}>
                <p>
                  Entrar com <span>{provider?.name}</span>
                </p>
                {provider?.name === "Google" ? (
                  <AiOutlineGoogle size={20} color="#2F2E41" />
                ) : (
                  <FiGithub size={18} color="#2F2E41" />
                )}
              </Button>
            </div>
          ))}
        </InputWrapper>
      </LoginWrapper>
      <WelcomeWrapper>
        <WelcomeTitle>Bom te ver de novo.</WelcomeTitle>
        <WelcomeSubtitle>Bem vindo!</WelcomeSubtitle>
        <Image src="/login.svg" alt="Homem passando por uma porta" />
      </WelcomeWrapper>
    </Container>
  );
}

SignIn.getInitialProps = async () => {
  return {
    providers: await providers(),
  };
};
