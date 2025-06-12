import { useMutation } from "@tanstack/react-query";
import { post, put } from "../service/client";
import { Comment, ListResponse, Response } from "../types";
import { useData } from "./data";

interface LikeParams {
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

// const onMutate: (bookId: string, queryClient: QueryClient) => LikeContext = (
//   bookId,
//   queryClient,
// ) => {
//   const prevComments = queryClient.getQueryData<ListResponse<Comment>>([
//     "comments",
//     bookId,
//   ]);
//   queryClient.setQueryData<ListResponse<Comment>>(
//     ["comments", bookId],
//     (old) => {
//       if (!old) return old;
//       const newComments = old.items.map((comment) => {
//         if (comment.id.toString() === bookId) {
//           return { ...comment, liked: !comment.liked };
//         }
//         return comment;
//       });
//       return { ...old, items: newComments };
//     },
//   );
//   return { prevComments };
// };

export const useLikeComment = () => {
  return useMutation<Response<null>, Error, LikeParams, LikeContext>({
    mutationFn: ({ commentId }) => put(`/comment/${commentId}/like`),
  });
};

export const useCancelLikeComment = () => {
  return useMutation<Response<null>, Error, LikeParams, LikeContext>({
    mutationFn: ({ commentId }) => put(`/comment/${commentId}/unlike`),
  });
};

export const usePostComment = () => {
  return useMutation({
    mutationFn: ({ id, comment }: PostComment) =>
      post<Response<null>>(`/book/${id}/comments`, { content: comment }),
  });
};

export const useReplyPost = () => {
  return useMutation({
    mutationFn: ({ commentId, comment }: ReplyComment) =>
      post<Response<null>>(`/comment/${commentId}`, { content: comment }),
  });
};
