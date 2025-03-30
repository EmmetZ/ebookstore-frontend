import { Book, ListResponse } from "../types";
import { useData } from "./data";

export const useTag = () => {
  return useData<string[]>(["tags"], "/book/tags");
};

export const useBooks = (
  keyword: string,
  tag: string,
  pageIndex: number,
  pageSize: number
) => {
  return useData<ListResponse<Book>>(["books"], "/books", {
    requestConfig: {
      params: {
        keyword,
        tag,
        pageIndex,
        pageSize,
      },
    },
  });
};

export const useBook = (id: string) =>
  useData<Book>(["book", id], `/book/${id}`);
