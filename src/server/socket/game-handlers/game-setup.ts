import { Socket, Server as SocketServer } from "socket.io";
import {
  ClientToServerEvents,
  CreateGamePayload,
  ServerToClientEvents,
  SocketData,
} from "../../shared/event-types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import container from "../../../dependency-injection/container";

const { createGame } = container.cradle.gameSetupService;

export const gameSetupHandlers = (
  ioServer: SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SocketData
  >,
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SocketData
  >
) => {
  socket.on("createGame", async (payload: CreateGamePayload) => {
    const gameCreated = await createGame(
      payload,
      socket.data.authenticatedUser!.id
    );

    console.log(
      `New game room requested for user ${socket.data.authenticatedUser?.name}`
    );

    ioServer.emit("gameCreated", gameCreated);
  });
};
