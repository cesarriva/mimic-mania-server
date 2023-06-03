import { User } from "@prisma/client";

export interface ServerToClientEvents {
  newGameCreated: (gameCode: string) => void;
}

export interface ClientToServerEvents {
  requestNewGame: () => void;
}

export interface SocketData {
  authenticatedUser?: User;
}
