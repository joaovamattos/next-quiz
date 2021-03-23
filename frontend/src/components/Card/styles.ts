import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 14rem;
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
  transition: 0.2s ease-in;

  :hover {
    transform: scale(1.05);
  }
`;

export const Avatar = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 1.125rem;
  margin-right: 0.5rem;
`;

export const CardHeader = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }
`;

export const Username = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CreatedAt = styled.div`
  font-size: 0.625rem;
  color: ${(props) => props.theme.colors.primary};
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;

export const StartButton = styled.button`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
  display: flex;
  align-items: center;
  border: 0;
  padding: 0.25rem;
  background: transparent;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    transform: translateY(-0.25rem);
    background: ${(props) => props.theme.colors.foreground};
  }
  svg {
    margin-left: 0.5rem;
    padding: 0;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  padding: 0.25rem;
  background: transparent;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    transform: translateY(-0.25rem);
    background: ${(props) => props.theme.colors.foreground};
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ActionsWrapper = styled.div`
  display: flex;
`;
