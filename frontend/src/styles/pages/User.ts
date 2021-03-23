import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${(props) => props.theme.colors.primary};
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.header`
  width: 100%;
  height: 21rem;
  background: ${(props) => props.theme.colors.background};

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  max-width: 64rem;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 30rem) {
    max-width: 100%;
    margin-top: 1rem;
  }
`;

export const Username = styled.p`
  max-width: 16rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;

export const Text = styled.p`
  max-width: 16rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
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

export const Avatar = styled.img`
  margin-bottom: 0.5rem;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: contain;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;

  svg {
    margin-right: 0.25rem;
  }
`;
