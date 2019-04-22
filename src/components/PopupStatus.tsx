import React from "react";
import Mascot, { MascotColor } from "./Mascot";
import { Badsite } from "../content/content";
import * as S from "./PopupStatus.styles";
import {
  Screen,
  Header,
  Title,
  Button,
  MascotPosition
} from "../global.styles";

interface PopupStatusProps {
  version: string;
  sites: [Badsite?];
  updated: Date;
  doReport: () => void;
}

function PopupStatus({
  version,
  sites = [],
  updated = new Date(0),
  doReport
}: PopupStatusProps): JSX.Element {
  return (
    <Screen>
      <Header>
        <MascotPosition>
          <Mascot color={MascotColor.Green} />
        </MascotPosition>
        <S.Status>
          <Title>
            betterweb <small>{version}</small>
          </Title>
          <S.Active>Active</S.Active>
          <Button onClick={doReport}>Report Site</Button>
        </S.Status>
      </Header>
      <S.Monitoring>
        Monitoring links to <b>{sites.length}</b> domains.
      </S.Monitoring>
      <S.Reporting />

      <S.UpdateFooter>
        Last checked for updates on {updated.toLocaleDateString()} at{" "}
        {updated.toLocaleTimeString()}.
      </S.UpdateFooter>
    </Screen>
  );
}

export default PopupStatus;
