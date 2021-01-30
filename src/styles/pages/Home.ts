import styled from "styled-components";

export const Background = styled.div`
  background: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100vh;
  z-index: -1;

  ::after {
    content: "React.js Next.js Typescript Mongodb Styled Components Vercel Github";
    text-align: center;
    line-height: 11rem;
    font-size: 12.5rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.secondary};
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;

    @media (max-width: 48rem) {
      line-height: 7rem;
      font-size: 8.5rem;
      text-align: start;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Navbar = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  padding-top: 3.6rem;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.background};
  font-size: 2.4rem;
  white-space: nowrap;

  @media (max-width: 48rem) {
    font-size: 2rem;
  }
`;

export const RepoLink = styled.button`
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: ${(props) => props.theme.colors.background};
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.foreground};
  }
`;

export const Wrapper = styled.div`
  padding: 3rem;
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Description = styled.h2`
  color: ${(props) => props.theme.colors.background};
  font-size: 4rem;
  text-align: center;
  max-width: 48rem;

  @media (max-width: 48rem) {
    font-size: 2.5rem;
  }
`;

export const Button = styled.button`
  margin-top: 3rem;
  padding: 0 2.5rem;
  width: 16rem;
  min-height: 3.6rem;
  display: flex;
  align-items: center;

  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.primary};

  background: ${(props) => props.theme.colors.background};
  border: 0;
  border-radius: 2rem;

  cursor: pointer;
  transition: 0.3s ease-in;

  :hover {
    background: ${(props) => props.theme.colors.foreground};
  }

  svg {
    margin-left: 0.5rem;
  }
`;
