import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
`;

export const Wrapper = styled.div`
  height: 4rem;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  a {
    font-size: 1.8rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    transition: 0.3s ease-in;

    :hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;

export const Username = styled.p`
  font-weight: 700;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.primary};
  transition: 0.3s ease-in;

  :hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-left: 0.75rem;
  width: 2.4rem;
  height: 2.4rem;

  ::after {
    content: "";
    position: absolute;
    top: -0.25rem;
    left: -0.25rem;
    bottom: -0.25rem;
    right: -0.25rem;
    border: 0.125rem ${(props) => props.theme.colors.primary} solid;
    border-radius: 50%;

    transition: 0.3s ease-in;

    :hover {
      border: 0.125rem ${(props) => props.theme.colors.secondary} solid;
    }
  }
`;

export const Avatar = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
`;

export const Menu = styled.div`
  width: 10rem;
  background: ${(props) => props.theme.colors.background};
  position: absolute;
  top: 4.5rem;
  right: 0.75rem;
  z-index: 10;
  border: 0.125rem solid ${(props) => props.theme.colors.secondary};
  border-radius: 0.25rem;

  & a {
    text-decoration: none;
  }

  ::after {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    background: ${(props) => props.theme.colors.background};
    transform: rotate(45deg);

    position: absolute;
    right: 1.75rem;
    top: -0.5rem;

    border: 0.125rem solid ${(props) => props.theme.colors.background};
    border-left-color: ${(props) => props.theme.colors.secondary};
    border-top-color: ${(props) => props.theme.colors.secondary};
  }
`;

export const Item = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;

  :nth-child(1) {
    margin-top: 0.7rem;
  }

  :nth-child(3) {
    margin-bottom: 0.4rem;
  }

  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};

  cursor: pointer;
  transition: 0.2s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.foreground};
  }
`;
