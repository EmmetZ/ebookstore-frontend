import { LoginFormValue, Response, User } from "../types";
import client from "./client";

export const getMe: () => Promise<Response<User>> = async () => {
  try {
    let result = await client.get<User>("/user/me", { withCredentials: true });
    return {
      ok: true,
      message: "成功",
      data: result.data,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message ?? "网络出错",
      data: {} as User,
    };
  }
};

export const login: (body: LoginFormValue) => Promise<Response<null>> = async (
  body
) => {
  try {
    let result = await client.post<Response<null>>("/login", body, {
      withCredentials: true,
    });
    return result.data;
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message ?? "网络出错",
      data: null,
    };
  }
};
