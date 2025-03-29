import { Comment, ListResponse } from "../types";
import { useData } from "./data";

export const useComment = (id: string, pageIndex: number, sort: string) => {
  return useData<ListResponse<Comment>>(
    ["comments", id],
    `book/${id}/comments`,
    {
      requestConfig: {
        params: {
          pageIndex,
          sort,
          pageSize: 10,
        },
      },
    },
  );
};
