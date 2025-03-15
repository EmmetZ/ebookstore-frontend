import { OtherUser, User } from "../types";

const isUser = (user: User | OtherUser): user is User => {
  return "balance" in user;
};

export default isUser;
