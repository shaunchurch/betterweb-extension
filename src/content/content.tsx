import React from "react";
import { render } from "react-dom";
import Alert from "../components/Alert";
import { saveDataToStorage, getDataFromStorage } from "../lib/storage";
import { loadBlocklist } from "../lib/api";
import { extractHostname } from "../lib/utils";

const UPDATE_FREQUENCY = 1000 * 600; // update blocklist every 600 seconds = ten minutes

type Badnet = Map<string, boolean>;

export interface Badsite {
  url: string;
  name?: string;
  reasons?: string[];
}

/**
 * With the top level array of domains build a Map we can consult
 * including variations on domains eg. with/without www.
 * TODO: move to api?
 */
function buildMap(sites: Badsite[]): Badnet {
  const badnet = new Map();
  sites.forEach(
    (site): void => {
      const url = site.url;
      if (!url) return;
      badnet.set(url, true);
      if (url.startsWith("www.")) {
        badnet.set(url.substring(4), true);
      } else {
        badnet.set("www." + url, true);
      }
    }
  );
  return badnet;
}

/**
 * Modify a DOM link with alert icon
 */
function modifyLink(link: HTMLAnchorElement | HTMLAreaElement): void {
  const warning = document.createElement("span");
  link.parentNode.insertBefore(warning, link);
  link.isBadnet = true;
  render(<Alert link={link} />, warning);
}

/**
 * Loop through all links on the page and modify if necessary
 */
function makeItBetter(badnet: Badnet): void {
  console.log("bettering...");
  // for all document links
  Object.values(document.links).forEach(
    (link): void => {
      const domain = extractHostname(link.href);
      const text = extractHostname(link.innerText);
      let hostname = window.location.host;

      if (!shouldModifyOnHost(hostname, domain, text)) {
        return null;
      }

      // if it's in the list insert the alert
      if ((badnet.get(domain) || badnet.get(text)) && link.isBadnet !== true) {
        modifyLink(link);
      }
    }
  );
}

function shouldModifyOnHost(hostname: string, domain: string, text: string) {
  if (hostname === domain || hostname === text) {
    return false;
  }

  if (hostname.startsWith("www.")) {
    hostname = hostname.substring(4);
  } else {
    hostname = "www." + hostname;
  }

  if (hostname === domain || hostname === text) {
    return false;
  }
  return true;
}

function shouldUpdate(timestamp: number): boolean {
  if (new Date().getTime() - timestamp > UPDATE_FREQUENCY) {
    return true;
  }
  return false;
}

// kick off
(async function(): Promise<void> {
  try {
    console.log("Betterweb active.");

    let { sites = [], timestamp = 0 } = await getDataFromStorage([
      "sites",
      "timestamp"
    ]);

    // if the local list is nonexistent, or stale
    if (!sites || !sites.length || shouldUpdate(timestamp)) {
      console.log("Updating Betterweb list...");
      sites = await loadBlocklist();
      saveDataToStorage({ sites, timestamp: new Date().getTime() });
    }

    const badnet = buildMap(sites);

    // 🚀
    makeItBetter(badnet);

    // crudely rerun it to catch late loading links
    // TODO: detect changes to dom that aren't us, for lazy loaded content
    setTimeout((): void => makeItBetter(badnet), 2000);
    setTimeout((): void => makeItBetter(badnet), 4000);
    setTimeout((): void => makeItBetter(badnet), 8000);
  } catch (e) {
    console.error(e);
  }
})();
