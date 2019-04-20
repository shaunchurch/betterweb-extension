import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import manifest from "../../manifest.json";
import { getDataFromStorage } from "../lib/storage";

const logoPath = require("../images/icon.svg") as string;

function Extension(): JSX.Element {
  const [list, setList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(0);
  const date = new Date(lastUpdate);

  useEffect((): void => {
    const fetchList = async (): Promise<void> => {
      let { list = [], timestamp = 0 } = await getDataFromStorage([
        "list",
        "timestamp"
      ]);
      setList(list);
      setLastUpdate(timestamp);
    };

    fetchList();
  }, []);

  return (
    <div>
      <img width="175" src={logoPath} />
      <h1>Betterweb {manifest.version}</h1>
      <p>
        There are <b>{list.length}</b> domains in the database.
      </p>
      <p>
        Last checked for updates on {date.toLocaleDateString()} at{" "}
        {date.toLocaleTimeString()}.
      </p>
    </div>
  );
}

render(<Extension />, document.getElementById("root"));
