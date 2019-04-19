export async function loadBlocklist(): Promise<string[]> {
  const res = await fetch(
    "https://api.airtable.com/v0/appQzNVtC3eb9YiJD/Blocklist?api_key=keymITLbejmbTVRY1"
  );
  const data = await res.json();
  return data.records;
}
