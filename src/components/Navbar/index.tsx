import React from "react";
import Link from "next/link";

import {
  Container,
  Wrapper,
  Title,
  UserWrapper,
  Username,
  AvatarWrapper,
  Avatar,
} from "./styles";

const Navbar: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <Link href="/dashboard">
            <a>Next Quiz</a>
          </Link>
        </Title>
        <UserWrapper>
          <Username>João</Username>
          <AvatarWrapper>
            <Avatar
              src="https://avatars.githubusercontent.com/u/23246259?s=460&u=1960607c596b9f7c800a07d7c55dbc698ccdda97&v=4"
              alt="João"
            />
          </AvatarWrapper>
        </UserWrapper>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
