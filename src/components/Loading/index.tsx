import React from "react";
import Head from "next/head";

import { Container, Spinner } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Next Quiz</title>
      </Head>
      <Spinner />
    </Container>
  );
};

export default Loading;
