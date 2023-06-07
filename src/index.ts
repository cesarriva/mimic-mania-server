import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

import app from "./server";
import {
  registerSocketHandlers,
  setupClientSocketAuthentication,
} from "./server/socket";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./server/shared/event-types";

const port = process.env.PORT || 4000;

export const httpServer = createServer(app);
export const socketIoServer = new SocketServer<
  ClientToServerEvents,
  ServerToClientEvents
>(httpServer, { cors: { origin: "http://localhost:19000" } });

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port} ⚡️`);
});

socketIoServer.on("connection", (socket) => {
  console.info(`New client [${socket.id}] connected`);
  registerSocketHandlers(socketIoServer, socket);

  socket.on("disconnect", () => {
    console.info(`Client [${socket.id}] disconnected`);
  });
});

setupClientSocketAuthentication(socketIoServer);

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
