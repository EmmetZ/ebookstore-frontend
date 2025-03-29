import { useData } from "./data";

export const useTag = () => {
  return useData<string[]>(["tags"], "/book/tags");
};
