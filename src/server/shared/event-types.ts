import { User } from "@prisma/client";

export interface ServerToClientEvents {
  gameCreated: (gameData: CreateGameResponse) => void;
}

export interface ClientToServerEvents {
  createGame: (payload: CreateGameRequest) => void;
}

export interface SocketData {
  authenticatedUser?: User;
}

/**
 * Payload for a game creation
 */
export interface CreateGameRequest {
  gameName: string;
  categoriesIds: number[];
}

export interface CreateGameResponse {
  gameName: string;
  gameCode: string;
}