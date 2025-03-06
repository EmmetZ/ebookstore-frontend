import { LoginFormValue, Response } from "../types";
import client from "./client";

const login: (body: LoginFormValue) => Promise<Response<null>> = async (
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

export default login;
