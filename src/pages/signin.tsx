import { providers, signIn } from "next-auth/client";
import {
  Container,
  LoginWrapper,
  Wrapper,
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
  return (
    <Container>
      <LoginWrapper>
        <Navbar>
          <Title>Next Quiz</Title>
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
              </Button>
            </div>
          ))}
        </InputWrapper>
      </LoginWrapper>
      <Wrapper>
        <WelcomeTitle>Bom te ver de novo.</WelcomeTitle>
        <WelcomeSubtitle>Bem vindo!</WelcomeSubtitle>
        <Image src="/login.svg" alt="Homem passando por uma porta" />
      </Wrapper>
    </Container>
  );
}

SignIn.getInitialProps = async () => {
  return {
    providers: await providers(),
  };
};
