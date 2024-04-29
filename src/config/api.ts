import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getAuthToken } from "../utils/helpers";
import { useAuth } from "../hook/useAuth";
import { getStorageItem } from "../utils/storage";
import { AUTH_TOKEN } from "../utils/constants";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const apiEvents = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_EVENTS_URL,
  headers: { "Content-Type": "application/json" },
});

const apiCep = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_CEP_URL,
  headers: { "Content-Type": "application/json" },
});

async function onFulfilledRequest(config: InternalAxiosRequestConfig) {
  let token = "";
  await getStorageItem(AUTH_TOKEN)
    .then((response) => {
      if (response) token = response;
    })
    .catch((err) => console.log({ err }));

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}

apiEvents.interceptors.request.use(onFulfilledRequest, (error) => {
  Promise.reject(error);
});

export { api, apiEvents, apiCep };
