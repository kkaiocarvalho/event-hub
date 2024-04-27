import { AUTH_TOKEN } from "./constants";
import { getStorageItem } from "./storage";

export function getAuthToken() {
  return getStorageItem(AUTH_TOKEN);
}

export function formatPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/([-])(\d{4})(\d)/, "$1$2");
}

export function removeMasks(value: string) {
  return value.replace(/[^a-zA-Z^0-9]/g, "");
}
