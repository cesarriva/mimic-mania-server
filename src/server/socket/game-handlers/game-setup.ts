import { Socket, Server as SocketServer } from "socket.io";
import {
  ClientToServerEvents,
  CreateGameRequest,
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
  socket.on("createGame", async (payload: CreateGameRequest) => {
    if (!socket.data.authenticatedUser) {
      console.log("User not authenticated");
      return;
    }

    const { id } = socket.data.authenticatedUser;

    const gameCreated = await createGame({
      ...payload,
      userId: id,
    });

    ioServer.emit("gameCreated", gameCreated);
  });
};
