import { PrismaClient, User } from "@prisma/client";
import { UserWithNoPassword, UserCreatePayload } from "./auth.models";

export interface IAuthRepository {
  createUser: (user: UserCreatePayload) => Promise<UserWithNoPassword>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
}

export default class AuthRepository implements IAuthRepository {
  private prismaClient: PrismaClient;

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  createUser = async (user: UserCreatePayload): Promise<UserWithNoPassword> => {
    const createdUser = await this.prismaClient.user.create({
      data: { ...user },
      select: { id: true, email: true, name: true, proUser: true },
    });

    return createdUser;
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.prismaClient.user.findUnique({ where: { email } });

    return user;
  };

  getUserById = async (id: number): Promise<User | null> => {
    const user = await this.prismaClient.user.findUnique({ where: { id } });

    return user;
  };
}
