import { useMutation } from "@tanstack/react-query";
import { post, put } from "../service/client";
import {
  Book,
  BookAdditionFormValue as BookAddFormValue,
  BookAdmin,
  BookFormValue,
  ListResponse,
  Response,
} from "../types";
import { useData } from "./data";

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

export const useAdminBooks = (
  keyword: string,
  tag: string,
  pageIndex: number,
  pageSize: number,
) => {
  return useData<ListResponse<BookAdmin>>(["admin_books"], "/admin/books", {
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
  return useMutation<
    Response<null>,
    Error,
    { id: number; body: BookFormValue }
  >({
    mutationFn: ({ id, body }) => put<Response<null>>(`/book/${id}`, body),
    onError: (error) => {
      console.error("修改图书信息失败:", error);
    },
  });
};

export const useBookAddition = () => {
  return useMutation<Response<null>, Error, BookAddFormValue>({
    mutationFn: (body) => post<Response<null>>("/book", body),
    onError: (error) => {
      console.error("添加图书失败:", error);
    },
  });
};

export const useBookActive = () => {
  return useMutation<Response<null>, Error, { id: number; active: boolean }>({
    mutationFn: ({ id, active }) =>
      put<Response<null>>(`/admin/book/${id}/status`, { isActive: active }),
    onError: (error) => {
      console.error("修改图书状态失败:", error);
    },
  });
};

export const useBookRank = (startDate?: string, endDate?: string) =>
  useData<Book[]>(["rank"], "/books/rank", {
    requestConfig: {
      params: {
        start: startDate,
        end: endDate,
      },
    },
  });
