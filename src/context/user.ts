import { QueryObserverResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { User } from "../types";

interface TUserContext {
  user: User | null;
  refreshUser: () => Promise<QueryObserverResult<User | null>>;
  isLoading: boolean;
}

export const UserContext = createContext<TUserContext>({} as TUserContext);

export default function useUserContext() {
  return useContext(UserContext);
}
