console.log("Betternet active.");
const UPDATE_FREQUENCY = 1000 * 600; // 600 seconds = ten minutes

(async function() {
  const badnet = new Map();
  let sites = [];
  let lastDataUpdate = 0;

  // see if we have a local list
  chrome.storage.local.get(["list", "timestamp"], async storage => {
    sites = storage.list;
    lastDataUpdate = storage.timestamp;

    // if the local list is nonexistent, or stale
    if (!sites || !sites.length || shouldUpdate(lastDataUpdate)) {
      console.log("Updating database...");
      sites = await getData();
      chrome.storage.local.set(
        { list: sites, timestamp: new Date().getTime() },
        () => {
          // console.log("saved local db");
          buildMap();
          makeItBetter();
        }
      );
    }

    buildMap();
    makeItBetter();
  });

  // crudely rerun it to catch late loading links
  // TODO: detect changes to dom that aren't us inserting warnings
  setTimeout(makeItBetter, 2000);
  setTimeout(makeItBetter, 3000);
  setTimeout(makeItBetter, 5000);
  setTimeout(makeItBetter, 8000);
  setTimeout(makeItBetter, 11000);

  function shouldUpdate(timestamp) {
    if (new Date().getTime() - timestamp > UPDATE_FREQUENCY) {
      return true;
    }
    return false;
  }

  async function getData() {
    const res = await fetch(
      "https://api.airtable.com/v0/appQzNVtC3eb9YiJD/Blocklist?api_key=keymITLbejmbTVRY1"
    );
    const data = await res.json();
    return data.records;
  }

  async function buildMap() {
    sites.forEach(site => {
      const url = site.fields.URL;
      if (!url) return;
      badnet.set(url, true);
      if (url.startsWith("www.")) {
        badnet.set(url.substring(4));
      } else {
        badnet.set("www." + url, true);
      }
    });
  }

  function makeItBetter() {
    console.log("bettering...");
    Object.values(document.links).forEach(link => {
      if (
        (badnet.get(extractHostname(link.href)) ||
          badnet.get(extractHostname(link.innerText))) &&
        link.isBadnet !== true
      ) {
        var style = window
          .getComputedStyle(link, null)
          .getPropertyValue("font-size");
        var fontSize = parseFloat(style);
        const warning = document.createElement("span");
        warning.className = "netbetterextension";
        warning.style.height = `${fontSize}px`;
        warning.style.width = `${fontSize}px`;
        warning.style.backgroundSize = `${fontSize}px`;
        // warning.innerHTML = "!!";
        // link.style.color = "#ff4136";
        link.parentNode.insertBefore(warning, link);
        link.isBadnet = true;
      }
    });
  }

  function extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }
    hostname = hostname.split(":")[0];
    hostname = hostname.split("?")[0];
    return hostname;
  }
})();
