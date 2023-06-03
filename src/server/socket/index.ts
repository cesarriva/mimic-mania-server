import { Socket, Server as SocketServer } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./event-types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import container from "../../dependency-injection/container";

const { authenticateSocketClient } = container.cradle.authMiddleware;

export const registerSocketHandlers = (
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
  console.log(`A client with Id [${socket.id}] connected`);

  socket.on("requestNewGame", () => {
    console.log(
      `New game room requested for user ${socket.data.authenticatedUser?.name}`
    );

    const gameCode = "1234";
    ioServer.emit("newGameCreated", gameCode);
  });
};

export const setupClientSocketAuthentication = (ioServer: SocketServer) => {
  ioServer.use(authenticateSocketClient);
};

export * from "./event-types";
