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

export interface PasswordFormValue {
  password: string;
}

export interface OtherUser {
  username: string;
  nickname: string;
  avatar: string | null;
  introduction: string | null;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  author: string;
  cover: string;
  description: string;
  price: number;
  sales: number;
  title: string;
  tags: Tag[];
}

export interface ListResponse<T> {
  total: number;
  items: T[];
}

export interface Comment {
  id: number;
  userId: number;
  username: string;
  avatar: string;
  content: string;
  reply: string;
  like: number;
  liked: boolean;
  createdAt: string;
}

export interface CartItem {
  id: number;
  book: Book;
  number: number;
}

export interface Order extends Address {
  createdAt: string;
  items: CartItem[];
}
