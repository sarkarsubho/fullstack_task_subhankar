import { Server } from "socket.io";
import { addTaskToRedis, checkAndMigrateTasks } from "./services/redisService";
import { socketKeys } from "./const/config";

export function initSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on(socketKeys.add, async (task: string) => {
      await addTaskToRedis(task);
      await checkAndMigrateTasks();
      io.emit("add", task);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
