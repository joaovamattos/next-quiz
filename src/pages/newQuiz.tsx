import Head from "next/head";
import { useRouter } from "next/router";

import { useSession } from "next-auth/client";
import { FiPlus } from "react-icons/fi";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

import { Label } from "../styles/global";

import {
  Container,
  Main,
  Header,
  HeaderWrapper,
  Title,
  Description,
  Form,
  FormHeader,
  FormTitle,
  Divider,
  InputGroup,
  Input,
  AddButton,
  AnswerWrapper,
  Radio,
  Select,
  ButtonsWrapper,
  Button,
  CancelButton,
} from "../styles/pages/NewQuiz";

const customStyles = {
  menuList: (provided, state) => ({
    ...provided,
    border: 0,
    background: "#fff",
    padding: 16,
  }),
};

export default function Dashboard() {
  const [session, loading] = useSession();
  const router = useRouter();

  const options = [
    { value: "beginner", label: "Iniciante" },
    { value: "medium", label: "Médio" },
    { value: "hard", label: "Difícil" },
  ];

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
          <Title>Crie um super quiz.</Title>
          <Description>
            Compartilhe seu super quiz com todos os seus amigos.
          </Description>
        </HeaderWrapper>
      </Header>

      <Main>
        <Form>
          <FormHeader>
            <FormTitle>Dados do quiz</FormTitle>
            <Divider />
          </FormHeader>
          <InputGroup>
            <Label htmlFor="title">Título do seu quiz</Label>
            <Input
              type="text"
              placeholder="Ex.: Você sabe tudo de Harry Potter?"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="title">Nível de difículdade</Label>
            <Select options={options} styles={customStyles} />
          </InputGroup>

          <form>
            <FormHeader>
              <div>
                <FormTitle>Questão #1</FormTitle>
                <AddButton>
                  <FiPlus size={24} color="#556BF4" />
                  Nova questão
                </AddButton>
              </div>
              <Divider />
            </FormHeader>
            <InputGroup>
              <Label htmlFor="question">Pergunta</Label>
              <Input id="question" type="text" placeholder="Iniciante" />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="answer">Respostas</Label>
              <AnswerWrapper>
                <Radio name="answer" type="radio" id="contactChoice1" checked />
                <Input id="answer" type="text" placeholder="Ex.: Tiago" />
              </AnswerWrapper>
              <AnswerWrapper>
                <Radio name="answer" type="radio" id="contactChoice1" />
                <Input type="text" placeholder="Ex.: Black" />
              </AnswerWrapper>
              <AnswerWrapper>
                <Radio name="answer" type="radio" id="contactChoice1" />
                <Input type="text" placeholder="Ex.: Sirius" />
              </AnswerWrapper>
              <AnswerWrapper>
                <Radio name="answer" type="radio" id="contactChoice1" />
                <Input type="text" placeholder="Ex.: Lupin" />
              </AnswerWrapper>
            </InputGroup>
          </form>
          <ButtonsWrapper>
            <CancelButton>Cancelar</CancelButton>
            <Button>Salvar</Button>
          </ButtonsWrapper>
        </Form>
      </Main>
    </Container>
  );
}
