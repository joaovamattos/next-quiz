import styled from "styled-components";
import SelectInput from "react-select";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${(props) => props.theme.colors.primary};
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
  flex-direction: column;
  padding: 0 2rem;

  @media (max-width: 30rem) {
    max-width: 100%;
    margin-top: 1rem;
  }
`;

export const Title = styled.p`
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

export const Description = styled.p`
  max-width: 16rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.primary};
`;

export const Main = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 2rem;

  position: relative;
  left: 0;
  right: 0;
  top: -2rem;
`;

export const Form = styled.form`
  width: 100%;
  border-radius: 0.25rem;
  padding: 3.375rem 4rem;
  background: ${(props) => props.theme.colors.lightBlue};

  @media (max-width: 36rem) {
    padding: 2rem;
  }
`;

export const FormHeader = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FormTitle = styled.legend`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  font-size: 1.5rem;
`;

export const Divider = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

export const InputGroup = styled.div`
  margin-top: 1.5rem;
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  height: 3rem;
  padding: 0 1.5rem;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1rem;
  border: 0;
  border-radius: 0.25rem;

  ::placeholder {
    color: ${(props) => props.theme.colors.primary};
    font-size: 0.875rem;
  }
`;

export const AddButton = styled.button`
  margin-top: 2rem;
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }
`;

export const Select = styled(SelectInput)`
  div.css-1wa3eu0-placeholder {
    color: ${(props) => props.theme.colors.primary};
    font-size: 0.875rem;
  }

  > div {
    margin-top: 0.5rem;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.secondary};
    font-size: 1rem;
    border: 0;
    border-radius: 0.25rem;
    box-shadow: none;
  }
`;

export const Button = styled.button`
  height: 3.375rem;
  width: 11rem;
  border: 0;
  border-radius: 0.25rem;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 30rem) {
    width: 100%;
  }
`;

export const CancelButton = styled.button`
  margin-right: 1rem;
  height: 3.375rem;
  width: 11rem;
  border: 0;
  border-radius: 0.25rem;
  background: #7f7f8b;
  color: ${(props) => props.theme.colors.background};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in;

  :hover {
    background: #9a9aa1;
  }

  @media (max-width: 30rem) {
    margin: 0;
    margin-bottom: 0.5rem;
    width: 100%;
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 30rem) {
    margin-top: 2rem;
    flex-direction: column;
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;
  + fieldset {
    margin-top: 3rem;
  }
`;
