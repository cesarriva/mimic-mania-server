import { User } from "@prisma/client";

export interface UserCreatePayload extends Omit<User, "id"> {}

export interface UserWithNoPassword extends Omit<User, "password"> {}

export interface LoginPayload extends Omit<User, "id" | "name"> {}

export interface LoggedUser {
  user: UserWithNoPassword;
  token?: string;
}
