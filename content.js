console.log("Betternet active.");

(async function() {
  console.log("loading sites...");
  const sites = await getData(); // TODO cache in local storage?
  console.log("loaded.");
  const badnet = new Map();

  // get the urls from Airtable
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
      console.log("adding", url);
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
        // get the font size of the link text
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

  await buildMap();
  makeItBetter();

  // don't use this to trigger inserting a dom node...
  // document.addEventListener("DOMNodeInserted", netBeBetter);

  // crudely rerun it to catch late loading links
  // TODO: detect changes to dom that aren't us inserting warnings
  setTimeout(makeItBetter, 2000);
  setTimeout(makeItBetter, 3000);
  setTimeout(makeItBetter, 4000);
  setTimeout(makeItBetter, 5000);
  setTimeout(makeItBetter, 6000);

  function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }
    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];
    return hostname;
  }
})();
