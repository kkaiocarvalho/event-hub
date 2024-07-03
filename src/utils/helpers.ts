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

export function formatDateToShow(value: string, options = { withTime: false }) {
  const date = new Date(value);
  const toLocale = (value: number) =>
    value.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2,
    });
  const year = date.getFullYear();
  const month = toLocale(date.getMonth() + 1);
  const day = toLocale(date.getDate());

  const hour = toLocale(date.getHours());
  const minute = toLocale(date.getMinutes());

  return `${day}/${month}/${year}${
    options.withTime ? ` às ${hour}:${minute}` : ""
  }`;
}

export function formatDateToSave(oldDate: Date): string {
  const date = oldDate.toLocaleDateString().split("/");
  const time = oldDate.toLocaleTimeString();

  return `${date[2]}-${date[1]}-${date[0]} ${time}`;
}
