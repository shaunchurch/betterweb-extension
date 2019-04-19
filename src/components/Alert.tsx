import React from "react";
import styled from "styled-components";

interface Props {
  size: number;
}

export default function Alert(props: Props) {
  return <AlertStyle>Look</AlertStyle>;
}

const AlertStyle = styled.div`
  background-size: ${props => props.size}px;
  background-repeat: no-repeat;
  background-position: bottom;
  display: inline-block;
  margin-right: 4px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;
