import { addTaskToRedis, checkAndMigrateTasks } from "./services/redisService.js";
import { socketKeys } from "./const/config.js";
export function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on(socketKeys.add, async (task) => {
            await addTaskToRedis(task);
            await checkAndMigrateTasks();
            io.emit("add", task);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}
