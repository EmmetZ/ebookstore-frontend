import { createContext, useContext } from "react";

interface ITagContext {
  selectedTag: string;
  setTag: (tag: string) => void;
}

export const TagContext = createContext<ITagContext>({} as ITagContext);

export default function useTagContext() {
  return useContext(TagContext);
}
