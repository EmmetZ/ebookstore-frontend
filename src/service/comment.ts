import { Comment, CommentSort, ListResponse } from "../types";
import { get } from "./client";

const getComments = (
  bookId: string,
  pageIndex: number,
  pageSize: number,
  sort: CommentSort,
) =>
  get<ListResponse<Comment>>(`/book/${bookId}/comments`, {
    params: {
      pageIndex: pageIndex,
      sort: sort,
      pageSize: pageSize,
    },
  });

export default getComments;
