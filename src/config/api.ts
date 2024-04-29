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

const apiCep = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_CEP_URL,
  headers: { "Content-Type": "application/json" },
});

async function onFulfilledRequest(config: InternalAxiosRequestConfig) {
  // const token = await getAuthToken();
  await getStorageItem(AUTH_TOKEN)
    .then((response) => {
      console.log("Await deu certo");
      console.log({ response });
      config.headers.Authorization = `Bearer ${response}`;
      return config;
    })
    .catch((err) => console.log({ err }));
  console.log("saiu da promisse ");
  console.log({ config });
  return config;
}

// api.interceptors.request.use(onFulfilledRequest, (error) => {
//   Promise.reject(error);
// });

export { api, apiCep };
