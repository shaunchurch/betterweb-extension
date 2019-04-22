import styled, { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize};
  
  

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 62.5%;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

export const Screen = styled.div`
  font-size: 1.6rem;
  width: 600px;
`;

export const MascotPosition = styled.div`
  margin-left: -70px;
  margin-top: -35px;
  width: 300px;
  overflow: hidden;
`;

export const Content = styled.section`
  margin-top: 24px;
  margin-left: 16px;
  max-width: 300px;
`;

export const Title = styled.h1`
  font-weight: 900;
  font-size: 2.4rem;
  margin: 0;

  small {
    font-size: 1.2rem;
    color: #bbb;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: horizontal;
`;

export const Close = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  :focus,
  :active {
    outline: none;
  }
`;

export const Button = styled.button`
  background: #f1f1f1;
  color: #273674;
  border-radius: 5px;
  border: none;
  align-self: flex-start;
  padding: 8px 16px;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #222;
    color: #f1f1f1;
  }

  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  font-size: 1.2rem;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #bbb;
`;

export const ErrorMessage = styled.p`
  color: #ff4136;
  font-size: 1.2rem;
`;
