import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { get } from "../service/client";

interface UseDataOptions {
  staleTime?: number;
  requestConfig?: AxiosRequestConfig;
}

export const useData = <T>(
  key: string[],
  endpoint: string,
  options?: UseDataOptions,
) => {
  const { staleTime = 24 * 60 * 60 * 1000, requestConfig } = options || {};

  return useQuery<T>({
    queryKey: [...key, requestConfig?.params],
    queryFn: () => get<T>(endpoint, requestConfig),
    staleTime,
  });
};
