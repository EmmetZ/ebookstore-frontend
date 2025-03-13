import { LoginFormValue, Response, User } from "../types";
import { post, put } from "./client";
import { get } from "./client";

export const login = (body: LoginFormValue) =>
  post<Response<null>>("/login", body);

export const getMe = () => get<User>("/user/me");

export const logout = () => put<Response<null>>("/logout");
