import styled from "styled-components";

export const Container = styled.div`
  background: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
  min-height: calc(100% - 4rem);
  width: 18rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.p`
  color: ${(props) => props.theme.colors.background};
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const ScoreWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

export const User = styled.p`
  color: ${(props) => props.theme.colors.background};
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const Pontuaition = styled.p`
  color: ${(props) => props.theme.colors.background};
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: 600;
  min-height: 3rem;
  margin-top: 2rem;
  width: 18rem;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.3s ease-in;

  color: ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.background};

  :hover {
    background: ${(props) => props.theme.colors.foreground};
  }
`;

export const OutlineButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: 600;
  min-height: 3rem;
  margin-top: 0.5rem;
  width: 18rem;
  padding: 0.5rem 1rem;
  border: 0.125rem solid ${(props) => props.theme.colors.background};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.3s ease-in;

  color: ${(props) => props.theme.colors.background};
  background: transparent;

  :hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`;
