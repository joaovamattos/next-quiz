import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${(props) => props.theme.colors.primary};
`;

export const Main = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 2rem;

  position: relative;
  left: 0;
  right: 0;
  top: -3.25rem;
`;

export const Header = styled.header`
  width: 100%;
  height: 12rem;
  background: ${(props) => props.theme.colors.background};

  @media (max-width: 30rem) {
    height: 16rem;
  }
`;

export const HeaderWrapper = styled.div`
  margin-top: 2rem;
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 30rem) {
    max-width: 100%;
    margin-top: 1rem;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

export const Text = styled.p`
  max-width: 16rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 36rem) {
    font-size: 1.4rem;
  }

  @media (max-width: 30rem) {
    margin-top: 1rem;
    font-size: 1.6rem;
  }
`;

export const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.25rem;
  width: 16rem;
  height: 2.8rem;
  margin-left: 1rem;

  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  text-decoration: none;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  transition: 0.3s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 30rem) {
    margin: 0;
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const NoQuiz = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.background};
  margin-top: 2rem;
`;

export const QuizesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 36.5rem) {
    grid-template-columns: 1fr;
  }
`;
