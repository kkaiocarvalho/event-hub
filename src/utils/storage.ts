import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  size: 10,
  storageBackend: AsyncStorage,

  // expire time: 1 day (1000 * 3600 * 24 milliseconds).
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // sync to reload token when spired - after MVP
  },
});

export function setStorageItem<T = unknown>(key: string, item: T) {
  storage.save({
    key,
    data: typeof item === "string" ? item : JSON.stringify(item),
    expires: 1000 * 3600,
  });
}

export async function getStorageItem<TReturn = string>(
  key: string,
  parse = false
): Promise<TReturn | null> {
  return await storage
    .load({
      key,
      autoSync: false,
      syncInBackground: false,
    })
    .then((ret) => {
      return parse && ret ? JSON.parse(ret) : ret;
    })
    .catch(() => {
      return null;
    });
}

export function removeStorageItem(key: string) {
  storage.remove({ key });
}
