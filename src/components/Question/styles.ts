import styled from "styled-components";

export const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  /* background: #fa3; */
`;

export const DeleteButton = styled.button`
  border: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  transition: 0.3s ease-in;
  cursor: pointer;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: ${(props) => props.theme.colors.background};
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const Checkbox = styled.label`
  background: #d1d1d6;
  margin-top: 0.5rem;

  width: 0.75rem;
  height: 0.75rem;
  border: 0;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  display: none;
`;
