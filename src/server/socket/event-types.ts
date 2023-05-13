export interface ServerToClientEvents {
  newGameCreated: (gameCode: string) => void;
}

export interface ClientToServerEvents {
  requestNewGame: () => void;
}
