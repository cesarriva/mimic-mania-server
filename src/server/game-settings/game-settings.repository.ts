import { PrismaClient, WordCategory } from "@prisma/client";

export interface IGameSettingsRepository {
  getWordCategories: () => Promise<WordCategory[]>;
}

export default class GameSettingsRepository implements IGameSettingsRepository {
  private prismaClient: PrismaClient;

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  getWordCategories = async (): Promise<WordCategory[]> => {
    const categories = await this.prismaClient.wordCategory.findMany();

    return categories;
  };
}
