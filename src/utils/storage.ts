//TODO: change set and get itens for local storage

export function setStorageItem<T = unknown>(key: string, item: T) {
  window.localStorage.setItem(
    key,
    typeof item === "string" ? item : JSON.stringify(item)
  );
}

export function getStorageItem<TReturn = string>(
  key: string,
  parse = false
): TReturn | null {
  const value = window.localStorage.getItem(key);
  return parse && value ? JSON.parse(value) : value;
}

export function removeStorageItem(key: string) {
  window.localStorage.removeItem(key);
}
