import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Book, BookFormValue, ListResponse, Response } from "../types";
import { useData } from "./data";
import { put } from "../service/client";

export const useTag = () => {
  return useData<string[]>(["tags"], "/book/tags");
};

export const useBooks = (
  keyword: string,
  tag: string,
  pageIndex: number,
  pageSize: number,
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

export const useBookEdit = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Response<null>,
    Error,
    { id: number; body: BookFormValue }
  >({
    mutationFn: ({ id, body }) => put<Response<null>>(`/book/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("修改图书信息失败:", error);
    },
  });
};
