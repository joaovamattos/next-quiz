import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: 'Ubuntu', sans-serif;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background: ${(props) => props.theme.colors.background};
  }
`;

export const Label = styled.label`
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.875rem;
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  height: 3rem;
  padding: 0 1.5rem;
  background: #e9ecff;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1rem;
  border: 0;
  border-radius: 0.25rem;

  ::placeholder {
    color: ${(props) => props.theme.colors.primary};
    font-size: 0.875rem;
  }
`;
