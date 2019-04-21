import React from "react";
import styled from "styled-components";
import { getAssetUrl } from "../lib/utils";
const warningPath = require("../images/warning.svg") as string;

interface Props {
  link?: HTMLAnchorElement | HTMLAreaElement;
}

export default function Alert(props: Props): JSX.Element {
  function getSize(): number {
    if (!props.link) {
      return 24;
    }
    return parseInt(
      window.getComputedStyle(props.link, null).getPropertyValue("font-size")
    );
  }

  function log(): void {
    console.log("hi", props.link.href);
  }

  return <AlertStyle onClick={log} size={getSize()} />;
}

const AlertStyle = styled.div`
  background-image: url('${getAssetUrl(warningPath)}');
  background-size: ${props => props.size}px;
  background-repeat: no-repeat;
  background-position: bottom;
  display: inline-block;
  margin-right: 4px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  cursor: pointer;
`;
