import { Response, User } from "../types";
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
