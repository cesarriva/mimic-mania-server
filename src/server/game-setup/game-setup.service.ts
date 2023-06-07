import { WordCategory } from "@prisma/client";
import { IGameSetupRepository } from "./game-setup.repository";
import { CreateGamePayload } from "../shared/event-types";

export interface IGameSetupService {
  getWordCategories: () => Promise<WordCategory[]>;
  createGame: (settings: CreateGamePayload, userId: number) => Promise<string>;
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

  getWordCategories = (): Promise<WordCategory[]> => {
    return this.gameSetupRepository.getWordCategories();
  };

  createGame = (
    settings: CreateGamePayload,
    userId: number
  ): Promise<string> => {
    console.log(
      `Let's create a game. Settings: ${JSON.stringify(
        settings
      )} User ID: ${userId}`
    );
    return Promise.resolve(settings.gameName);
  };
}
