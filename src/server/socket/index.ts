import { Socket, Server as SocketServer } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./event-types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const registerSocketHandlers = (
  ioServer: SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    any
  >,
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    any
  >
) => {
  console.log(`A client with Id [${socket.id}] connected`);

  socket.on("requestNewGame", () => {
    console.log("New game room requested");

    const gameCode = "1234";
    ioServer.emit("newGameCreated", gameCode);
  });
};

export * from "./event-types";
