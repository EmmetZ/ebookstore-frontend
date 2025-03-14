import axios, { AxiosRequestConfig } from "axios";
import { PREFIX } from "./common";

const client = axios.create({
  baseURL: PREFIX,
  timeout: 5000,
  withCredentials: true,
});

export const get = <T>(endpoint: string, options?: AxiosRequestConfig) =>
  client.get<T>(endpoint, { ...options }).then((res) => res.data);
export const post = <T, D = any>(
  endpoint: string,
  data?: D,
  options?: AxiosRequestConfig,
) => client.post<T>(endpoint, data, { ...options }).then((res) => res.data);

export const put = <T, D = any>(
  endpoint: string,
  body?: D,
  options?: AxiosRequestConfig,
) => client.put<T>(endpoint, body, { ...options }).then((res) => res.data);

