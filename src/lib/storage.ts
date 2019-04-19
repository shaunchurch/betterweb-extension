export function saveDataToStorage(data: Object): Promise<boolean> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(data, () => {
      resolve(true);
    });
  });
}

export function getDataFromStorage(fields: string | string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(fields, async storage => {
      resolve(storage);
    });
  });
}
