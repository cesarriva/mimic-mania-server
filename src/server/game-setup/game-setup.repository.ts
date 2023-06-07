import { Game, PrismaClient, WordCategory } from "@prisma/client";

export interface IGameSetupRepository {
  getWordCategories: () => Promise<WordCategory[]>;
  createGame: (
    gameName: string,
    userId: number,
    categoriesIds: number[]
  ) => Promise<void>;
}

export default class GameSetupRepository implements IGameSetupRepository {
  private prismaClient: PrismaClient;

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  getWordCategories = async (): Promise<WordCategory[]> => {
    const categories = await this.prismaClient.wordCategory.findMany();

    return categories;
  };

  createGame = async (
    gameName: string,
    userId: number,
    categoriesIds: number[]
  ): Promise<void> => {
    const game = await this.prismaClient.game.create({
      data: {
        name: gameName,
        wordCategories: {
          connect: categoriesIds.map((id) => ({ id })),
        },
        users: {
          create: {
            userId,
            isHost: true,
          },
        },
      },
    });
  };
}
