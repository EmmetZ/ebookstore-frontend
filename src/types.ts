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
  avatar: string;
  introduction: string | null;
  role: Role;
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
  stock: number;
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

export type CommentSort = "createdTime" | "like";

export interface Order extends Address {
  createdAt: string;
  items: CartItem[];
}

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface RegisterFormValue extends RegisterBody {
  confirm: string;
}

export interface BookFormValue {
  title: string;
  author: string;
  stock: number;
  price: number;
  description: string;
  tags: string[];
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface TmpCover {
  id: number;
  fileName: string;
}

export interface BookAdditionFormValue extends BookFormValue {
  coverId: number;
}

export interface BookAdmin extends Book {
  isActive: boolean;
}

export interface AdminUser {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  introduction: string | null;
  role: Role;
  isBanned: boolean;
}

export interface UserStatusBody {
  id: number;
  // is banned: boolean;
  status: boolean;
}

export interface UserConsumption {
  user: AdminUser;
  consumption: number;
}
