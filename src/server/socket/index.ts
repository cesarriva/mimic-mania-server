import { Socket, Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../shared/event-types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import container from "../../dependency-injection/container";
import { gameSetupHandlers } from "./game-handlers/game-setup";

const { authenticateSocketClient } = container.cradle.authMiddleware;

export const registerSocketHandlers = (
  ioServer: Server<
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
  gameSetupHandlers(ioServer, socket);
};

export const setupClientSocketAuthentication = (ioServer: Server) => {
  ioServer.use(authenticateSocketClient);
};

