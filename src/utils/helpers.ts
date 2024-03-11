import { AUTH_TOKEN } from "./constants";
import { getStorageItem } from "./storage";

export function getAuthToken() {
  return getStorageItem(AUTH_TOKEN);
}
