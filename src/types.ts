export interface LoginFormValue {
  username: string;
  password: string;
}

export interface Response<T> {
  message: string;
  ok: boolean;
  data: T;
}

export interface User {
  username: string;
  nickname: string;
  balance: number;
  avatar: string | null;
  introduction: string | null;
}

export interface IntroFormValue {
  introduction: string;
}

export interface Address extends AddressFormValue {
  id: number;
}

export interface AddressFormValue {
  address: string;
  tel: string;
  receiver: string;
}
