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
  private prismaClient: PrismaClient;

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  registerUser = async (
    email: string,
    name: string,
    password: string
  ): Promise<User | null> => {
    const user = await this.prismaClient.user.findFirst();
    console.log(user);

    return user;
  };

  loginUser = async (email: string, password: string): Promise<void> => {
    console.log("loginUser", email, password);
  };
}
