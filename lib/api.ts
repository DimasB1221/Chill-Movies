import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
} from "axios";
import { supabaseUrl, supabaseAnonKey } from "./supabaseClient";
// NOTE: Vite uses import.meta.env for environment variables.
// Ensure VITE_API_URL is defined in your .env file.
const api: AxiosInstance = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    request.headers["apikey"] = supabaseAnonKey;
    request.headers["Authorization"] = `Bearer ${supabaseAnonKey}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 500) {
      console.error("Gagal fetch data");
    }
    return Promise.reject(error);
  },
);

export default api;
