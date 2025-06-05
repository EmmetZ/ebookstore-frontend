import { createContext, useContext } from "react";

interface ITagsContext {
  tags: string[];
}

export const TagsContext = createContext<ITagsContext>({} as ITagsContext);

export default function useTagsContext() {
  return useContext(TagsContext);
}
