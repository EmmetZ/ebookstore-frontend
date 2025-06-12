import { createContext, useContext } from "react";

interface TCommentContext {
  refresh: () => Promise<void>;
}

export const CommentContext = createContext<TCommentContext>(
  {} as TCommentContext,
);

export default function useCommentContext() {
  return useContext(CommentContext);
}
