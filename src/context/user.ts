import { createContext, Dispatch, useContext } from "react";
import { User } from "../types";
import { QueryObserverResult } from "@tanstack/react-query";

interface TUserContext {
  user: User | null;
  refreshUser: () => Promise<QueryObserverResult<User | null>>;
  isLoading: boolean;
}

export const UserContext = createContext<TUserContext>({} as TUserContext);

export default function useUserContext() {
  return useContext(UserContext);
}
