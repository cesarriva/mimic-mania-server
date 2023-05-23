import { WordCategory } from "@prisma/client";
import { IGameSettingsRepository } from "./game-settings.repository";

export interface IGameSettingsService {
  getWordCategories: () => Promise<WordCategory[]>;
}

export default class GameSettingsService implements IGameSettingsService {
  private gameSettingsRepository: IGameSettingsRepository;

  constructor({
    gameSettingsRepository,
  }: {
    gameSettingsRepository: IGameSettingsRepository;
  }) {
    this.gameSettingsRepository = gameSettingsRepository;
  }

  getWordCategories = (): Promise<WordCategory[]> => {
    return this.gameSettingsRepository.getWordCategories();
  };
}
