import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { post, put } from "../service/client";
import { Comment, ListResponse, Response } from "../types";
import { useData } from "./data";

interface LikeParams {
  bookId: string;
  commentId: string;
}

interface LikeContext {
  prevComments: ListResponse<Comment> | undefined;
}

interface PostComment {
  id: string;
  comment: string;
}

interface ReplyComment {
  commentId: string;
  bookId: string;
  comment: string;
}

export const useComment = (
  id: string,
  pageIndex: number,
  pageSize: number,
  sort: string,
) => {
  return useData<ListResponse<Comment>>(
    ["comments", id],
    `/book/${id}/comments`,
    {
      requestConfig: {
        params: {
          pageIndex,
          sort,
          pageSize: pageSize,
        },
      },
    },
  );
};

const onMutate: (bookId: string, queryClient: QueryClient) => LikeContext = (
  bookId,
  queryClient,
) => {
  const prevComments = queryClient.getQueryData<ListResponse<Comment>>([
    "comments",
    bookId,
  ]);
  queryClient.setQueryData<ListResponse<Comment>>(
    ["comments", bookId],
    (old) => {
      if (!old) return old;
      const newComments = old.items.map((comment) => {
        if (comment.id.toString() === bookId) {
          return { ...comment, liked: !comment.liked };
        }
        return comment;
      });
      return { ...old, items: newComments };
    },
  );
  return { prevComments };
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation<Response<null>, Error, LikeParams, LikeContext>({
    mutationFn: ({ commentId }) => put(`/comment/${commentId}/like`),
    onMutate: ({ bookId }) => onMutate(bookId, queryClient),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", bookId] });
    },
    onError: (_, { bookId }, context) => {
      queryClient.setQueryData(["comments", bookId], context?.prevComments);
    },
  });
};

export const useCancelLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation<Response<null>, Error, LikeParams, LikeContext>({
    mutationFn: ({ commentId }) => put(`/comment/${commentId}/unlike`),
    onMutate: ({ bookId }) => onMutate(bookId, queryClient),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", bookId] });
      console.log("unlike success");
    },
    onError: (_, { bookId }, context) => {
      queryClient.setQueryData(["comments", bookId], context?.prevComments);
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: PostComment) =>
      post<Response<null>>(`/book/${id}/comments`, { content: comment }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });
};

export const useReplyPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, comment }: ReplyComment) =>
      post<Response<null>>(`/comment/${commentId}`, { content: comment }),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", bookId] });
    },
  });
};
