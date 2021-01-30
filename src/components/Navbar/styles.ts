import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
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
