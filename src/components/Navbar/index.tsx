import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import OutsideClickHandler from "react-outside-click-handler";

import {
  Container,
  Wrapper,
  Title,
  UserWrapper,
  Username,
  AvatarWrapper,
  Avatar,
  Menu,
  Item,
} from "./styles";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [session] = useSession();

  const toggleMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <Container>
      <Wrapper>
        <Title>
          <Link href="/dashboard">
            <a>Next Quiz</a>
          </Link>
        </Title>
        <UserWrapper onClick={toggleMenu}>
          <Username>{session?.user.name.split(" ")[0]}</Username>
          <AvatarWrapper>
            <Avatar src={session?.user.image} alt={session?.user.name} />
          </AvatarWrapper>
        </UserWrapper>
      </Wrapper>
      {visible && (
        <OutsideClickHandler onOutsideClick={toggleMenu}>
          <Menu>
            <Item>Meus quizes</Item>
            <Item>Histórico</Item>
            <Item onClick={() => signOut()}>Sair</Item>
          </Menu>
        </OutsideClickHandler>
      )}
    </Container>
  );
};

export default Navbar;
