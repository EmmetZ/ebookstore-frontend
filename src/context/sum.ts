import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface TSumContext {
  sum: number;
  setSum: Dispatch<SetStateAction<number>>;
}

export const SumContext = createContext<TSumContext>({} as TSumContext);

export default function useSumContext() {
  return useContext(SumContext);
}
