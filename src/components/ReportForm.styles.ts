import styled from "styled-components";

export const Form = styled.form``;

export const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  font-weight: bold;
`;

export const ReasonList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 1.2rem;

  li {
    line-height: 1.4rem;
    display: flex;
    align-items: center;
  }

  li > label {
    margin-left: 8px;
  }
`;
