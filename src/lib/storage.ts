import { Badsite } from "../content/content";

export function saveDataToStorage(data: Record<string, any>): Promise<boolean> {
  return new Promise(
    (resolve): void => {
      chrome.storage.local.set(
        data,
        (): void => {
          resolve(true);
        }
      );
    }
  );
}

export function getDataFromStorage(
  fields: string[]
): Promise<{ sites: [Badsite]; timestamp: number }> {
  return new Promise(
    (resolve): void => {
      chrome.storage.local.get(
        fields,
        async (storage): Promise<any> => {
          resolve(storage);
        }
      );
    }
  );
}
