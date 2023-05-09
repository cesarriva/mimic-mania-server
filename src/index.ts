import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

import app from "./express-server";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  registerSocketHandlers,
} from "./socket-server";

const port = process.env.PORT || 4000;

export const httpServer = createServer(app);
export const socketIoServer = new SocketServer<
  ClientToServerEvents,
  ServerToClientEvents
>(httpServer);

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port} ⚡️`);
});

socketIoServer.on("connection", (socket) => {
  registerSocketHandlers(socketIoServer, socket);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  if (httpServer) {
    httpServer.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
