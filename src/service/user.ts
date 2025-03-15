import {
  AddressFormValue,
  IntroFormValue,
  LoginFormValue,
  Response,
} from "../types";
import { del, post, put } from "./client";

export const login = (body: LoginFormValue) =>
  post<Response<null>>("/login", body);

export const logout = () => put<Response<null>>("/logout");

export const updateIntro = (body: IntroFormValue) =>
  put<Response<null>>("/user/me/introduction", body);

export const deleteAddress = (id: number) =>
  del<Response<null>>(`/user/me/addresses/${id}`);

export const addAddress = (body: AddressFormValue) =>
  post<Response<null>>("/user/me/addresses", body);
