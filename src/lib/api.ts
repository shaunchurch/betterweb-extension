export async function loadBlocklist(): Promise<string[]> {
  const res = await fetch("https://betterweb-api.shaun.church/badnet");
  const data = await res.json();
  return data.records;
}
