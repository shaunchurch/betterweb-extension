import React, { useState, useEffect } from "react";
import manifest from "../../manifest.json";
import { getDataFromStorage } from "../lib/storage";
import { GlobalStyle } from "../global.styles";
import PopupStatus from "./PopupStatus";
import ReportForm from "./ReportForm";

function Popup(): JSX.Element {
  const [sites, setSitesList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [isReportFormActive, setReportFormActive] = useState(false);

  const date = new Date(lastUpdate);

  useEffect((): void => {
    const fetchList = async (): Promise<void> => {
      let { sites, timestamp } = await getDataFromStorage([
        "sites",
        "timestamp"
      ]);
      setSitesList(sites);
      setLastUpdate(timestamp);
    };

    fetchList();
  }, []);

  if (isReportFormActive) {
    return (
      <>
        <ReportForm onClose={(): void => setReportFormActive(false)} />;
        <GlobalStyle />
      </>
    );
  }

  return (
    <>
      <PopupStatus
        version={manifest.version}
        sites={sites}
        updated={date}
        doReport={(): void => setReportFormActive(true)}
      />
      <GlobalStyle />
    </>
  );
}

export default Popup;
