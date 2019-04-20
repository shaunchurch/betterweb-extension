import React from "react";
import { render } from "react-dom";
import Alert from "../components/Alert";
import { saveDataToStorage, getDataFromStorage } from "../lib/storage";
import { loadBlocklist } from "../lib/api";
import { extractHostname } from "../lib/utils";

const UPDATE_FREQUENCY = 1000 * 600; // update blocklist every 600 seconds = ten minutes

type Badnet = Map<string, boolean>;

interface Badsite {
  url: string;
  name?: string;
  reasons?: string[];
}

// kick off
(async function() {
  console.log("Betterweb active.");

  let { list = [], timestamp = 0 } = await getDataFromStorage([
    "list",
    "timestamp"
  ]);

  // if the local list is nonexistent, or stale
  if (!list || !list.length || shouldUpdate(timestamp)) {
    console.log("Updating Betterweb list...");
    list = await loadBlocklist();
    saveDataToStorage({ list: list, timestamp: new Date().getTime() });
  }

  const badnet = buildMap(list);

  // 🚀
  makeItBetter(badnet);

  // crudely rerun it to catch late loading links
  // TODO: detect changes to dom that aren't us, for lazy loaded content
  setTimeout(() => makeItBetter(badnet), 2000);
  setTimeout(() => makeItBetter(badnet), 4000);
  setTimeout(() => makeItBetter(badnet), 8000);
})();

/**
 * With the top level array of domains build a Map we can consult
 * including variations on domains eg. with/without www.
 * TODO: move to api?
 */
function buildMap(list: Array<Badsite>): Badnet {
  const badnet = new Map();
  list.forEach(site => {
    const url = site.url;
    if (!url) return;
    badnet.set(url, true);
    if (url.startsWith("www.")) {
      badnet.set(url.substring(4), true);
    } else {
      badnet.set("www." + url, true);
    }
  });
  return badnet;
}

/**
 * Loop through all links on the page and modify if necessary
 */
function makeItBetter(badnet: Badnet): void {
  console.log("bettering...");
  // for all document links
  Object.values(document.links).forEach(link => {
    const domain = extractHostname(link.href);
    const text = extractHostname(link.innerText);

    // if it's in the list insert the alert
    if ((badnet.get(domain) || badnet.get(text)) && link.isBadnet !== true) {
      modifyLink(link);
    }
  });
}

/**
 * Modify a DOM link with alert icon
 */
function modifyLink(link: HTMLAnchorElement | HTMLAreaElement) {
  const warning = document.createElement("span");
  link.parentNode.insertBefore(warning, link);
  link.isBadnet = true;
  render(<Alert link={link} />, warning);
}

function shouldUpdate(timestamp: number): boolean {
  if (new Date().getTime() - timestamp > UPDATE_FREQUENCY) {
    return true;
  }
  return false;
}
