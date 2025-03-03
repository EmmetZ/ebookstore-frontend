import { LoginFormValue, Response } from "../types";
import client from "./client";

const login = async (body: LoginFormValue) => {
  const result = await client.post<Response<null>>("/login", body);
  return result;
};

export default login;
