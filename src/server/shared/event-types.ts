import { User } from "@prisma/client";

export interface ServerToClientEvents {
  gameCreated: (gameCode: string) => void;
}

export interface ClientToServerEvents {
  createGame: (payload: CreateGamePayload) => void;
}

export interface SocketData {
  authenticatedUser?: User;
}

/**
 * Payload for a game creation
 */
export interface CreateGamePayload {
  gameName: string;
  wordCategoryIds: string[];
}
