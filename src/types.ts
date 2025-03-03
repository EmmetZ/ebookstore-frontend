export interface LoginFormValue {
  username: string;
  password: string;
}

export interface Response<T> {
  message: string;
  ok: boolean;
  data: T;
}
