import { PrismaClient, User } from "@prisma/client";

export interface IAuthService {
  registerUser: (
    email: string,
    name: string,
    password: string
  ) => Promise<User | null>;
  loginUser: (email: string, password: string) => Promise<void>;
}

export default class AuthService implements IAuthService {
  registerUser = async (
    email: string,
    name: string,
    password: string
  ): Promise<User | null> => {
    console.log("registerUser", email, name, password);

    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst();
    console.log(user);

    return user;
  };

  loginUser = async (email: string, password: string): Promise<void> => {
    console.log("loginUser", email, password);
  };
}
