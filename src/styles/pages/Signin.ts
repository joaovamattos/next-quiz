import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Navbar = styled.nav`
  width: 100%;
  margin-bottom: auto;

  a {
    text-decoration: none;
  }
`;

export const LoginWrapper = styled.div`
  background: ${(props) => props.theme.colors.primary};

  max-width: 40%;
  width: 100%;
  height: 100vh;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 58rem) {
    max-width: 100%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.background};
  font-size: 2rem;
  white-space: nowrap;
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.background};
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 48rem) {
    font-size: 2rem;
  }
`;

export const Description = styled.h2`
  color: ${(props) => props.theme.colors.background};
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0 1.5rem;
  width: 16rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.primary};

  background: ${(props) => props.theme.colors.background};
  border: 0;
  border-radius: 0.25rem;

  cursor: pointer;
  transition: 0.3s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.foreground};
  }

  span {
    font-weight: bold;
  }

  svg {
    margin-left: 0.5rem;
  }
`;
3;

export const WelcomeWrapper = styled.div`
  background: ${(props) => props.theme.colors.lightBlue};
  max-width: 60%;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 58rem) {
    display: none;
  }
`;

export const Image = styled.img`
  max-width: 32rem;
  width: 100%;
  padding: 0 1.5rem;
`;

export const WelcomeTitle = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
`;

export const WelcomeSubtitle = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2.5rem;
  font-weight: 700;
  white-space: nowrap;
  margin-bottom: 1.5rem;

  @media (max-width: 48rem) {
    font-size: 2rem;
  }
`;
