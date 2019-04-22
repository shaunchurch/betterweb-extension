import React from "react";

const redMascotPath = require("../images/redmascot.png") as string;
const greenMascotPath = require("../images/greenmascot.png") as string;
const greyMascotPath = require("../images/greymascot.png") as string;

export enum MascotColor {
  Red,
  Green,
  Grey
}

interface Props {
  color?: MascotColor;
}

function Mascot(props: Props): JSX.Element {
  const { color } = props;
  let mascotPath = greenMascotPath;
  switch (color) {
    case MascotColor.Green:
      mascotPath = greenMascotPath;
      break;
    case MascotColor.Red:
      mascotPath = redMascotPath;
      break;
    case MascotColor.Grey:
      mascotPath = greyMascotPath;
      break;
  }
  return <img src={mascotPath} width="100%" />;
}

export default Mascot;
