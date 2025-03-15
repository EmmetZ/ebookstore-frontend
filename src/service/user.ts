import { IntroFormValue, LoginFormValue, Response } from "../types";
import { post, put } from "./client";

export const login = (body: LoginFormValue) =>
  post<Response<null>>("/login", body);

export const logout = () => put<Response<null>>("/logout");

export const updateIntro = (body: IntroFormValue) =>
  put<Response<null>>("/user/me/introduction", body);
