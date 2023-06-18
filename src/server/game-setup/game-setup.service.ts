import { WordCategory } from "@prisma/client";
import { IGameSetupRepository } from "./game-setup.repository";
import { generateRandomCode } from "./utils";
import { CreateGameResponse } from "../shared/event-types";

interface CreateGameServiceArgs {
  gameName: string;
  categoriesIds: number[];
  userId: number;
}

export interface IGameSetupService {
  getWordCategories: () => Promise<WordCategory[]>;
  createGame: (args: CreateGameServiceArgs) => Promise<CreateGameResponse>;
}

export default class GameSetupService implements IGameSetupService {
  private gameSetupRepository: IGameSetupRepository;

  constructor({
    gameSetupRepository,
  }: {
    gameSetupRepository: IGameSetupRepository;
  }) {
    this.gameSetupRepository = gameSetupRepository;
  }

  getWordCategories = async (): Promise<WordCategory[]> => {
    const categories = await this.gameSetupRepository.getWordCategories();

    return categories;
  };

  createGame = async (
    args: CreateGameServiceArgs
  ): Promise<CreateGameResponse> => {
    const { gameName, categoriesIds, userId } = args;

    const createdGame = await this.gameSetupRepository.createGame({
      gameName,
      gameCode: generateRandomCode(8),
      categoriesIds,
      userId,
    });

    return {
      gameName: createdGame.name,
      gameCode: createdGame.code,
    };
  };
}
