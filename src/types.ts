export interface LoginFormValue {
  username: string;
  password: string;
}

export interface Response<T> {
  message: string;
  ok: boolean;
  data: T;
}

export interface User extends LoginFormValue {
  balance: number;
  avatar: string;
  introduction: string;
}
