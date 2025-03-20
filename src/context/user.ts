import { createContext, Dispatch, useContext } from "react";
import { User } from "../types";

interface TUserContext {
  user: User | null;
  setUser: Dispatch<User | null>;
}

export const UserContext = createContext<TUserContext>({} as TUserContext);

export default function useUserContext() {
  return useContext(UserContext);
}
