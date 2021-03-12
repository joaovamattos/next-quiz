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
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProgressText = styled.p`
  color: ${(props) => props.theme.colors.background};
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const Progressbar = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 18rem;
  height: 0.5rem;
  margin-bottom: 2.25rem;
`;

interface Progress {
  percent: number;
}

export const Progress = styled.div<Progress>`
  background: ${(props) => props.theme.colors.background};
  width: ${(props) => props.percent}%;
  height: 0.5rem;
`;

export const Question = styled.p`
  color: ${(props) => props.theme.colors.background};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const AnswersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  min-height: 3rem;
  margin-top: 0.5rem;
  width: 18rem;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.3s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.foreground};
  }
`;
