import { Game, PrismaClient, WordCategory } from "@prisma/client";

interface CreateGameArgs {
  gameName: string;
  gameCode: string;
  userId: number;
  categoriesIds: number[];
}

export interface IGameSetupRepository {
  getWordCategories: () => Promise<WordCategory[]>;
  createGame: (args: CreateGameArgs) => Promise<Game>;
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

  createGame = async (args: CreateGameArgs): Promise<Game> => {
    const { gameName, gameCode, userId, categoriesIds } = args;

    const game = await this.prismaClient.game.create({
      data: {
        name: gameName,
        code: gameCode,
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

    return game;
  };
}
