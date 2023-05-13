import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

import app from "./server";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  registerSocketHandlers,
} from "./server/socket";

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
  console.log(err);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  if (httpServer) {
    httpServer.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  if (httpServer) {
    httpServer.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
