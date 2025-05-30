import {
  AddressFormValue,
  IntroFormValue,
  LoginFormValue,
  PasswordFormValue,
  Response,
  Role,
  User,
} from "../types";
import { del, get, post, put } from "./client";

export const login = (body: LoginFormValue) =>
  post<Response<{ role: Role }>>("/login", body);

export const logout = () => put<Response<null>>("/logout");

export const updateIntro = (body: IntroFormValue) =>
  put<Response<null>>("/user/me/introduction", body);

export const deleteAddress = (id: number) =>
  del<Response<null>>(`/user/me/addresses/${id}`);

export const addAddress = (body: AddressFormValue) =>
  post<Response<null>>("/user/me/addresses", body);

export const updatePassword = (body: PasswordFormValue) =>
  put<Response<null>>("/user/me/password", body);

export const getMe: () => Promise<User | null> = async () => {
  try {
    let resp = await get<User>("/user/me");
    return resp;
  } catch (e: any) {
    return null;
  }
};
