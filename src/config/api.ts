import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getAuthToken } from "../utils/helpers";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const apiCep = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_CEP_URL,
  headers: { "Content-Type": "application/json" },
});

async function onFulfilledRequest(config: InternalAxiosRequestConfig) {
  const token = await getAuthToken();
  console.log({ token });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(onFulfilledRequest, (error) =>
  Promise.reject(error)
);

export { api, apiCep };
