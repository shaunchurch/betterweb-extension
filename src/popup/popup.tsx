import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { getDataFromStorage } from "../lib/storage";

const logoPath = require("../images/icon.svg") as string;

function Extension() {
  const [list, setList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(0);
  const date = new Date(lastUpdate);

  useEffect(() => {
    const fetchList = async () => {
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
      <h1>Betterweb 0.3</h1>
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
