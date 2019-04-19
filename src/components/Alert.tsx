import React from "react";
import styled from "styled-components";

interface Props {
  link?: HTMLAnchorElement | HTMLAreaElement;
}

export default function Alert(props: Props) {
  function getSize() {
    if (!props.link) {
      return 24;
    }
    return parseInt(
      window.getComputedStyle(props.link, null).getPropertyValue("font-size")
    );
  }

  return <AlertStyle size={getSize()} className="netbetteralert" />;
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
