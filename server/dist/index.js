import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoute";
import { initSocket } from "./ws";
import { connectMongo } from "./services/mongoService";
import { connectRedis } from "./services/redisService";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(cors());
app.use(express.json());
app.use("/fetchAllTasks", taskRoutes);
const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
    try {
        await connectMongo().then(() => {
            console.log("MongoDB connected successfully");
        });
        initSocket(io);
        console.log("Socket.io initialized successfully");
        connectRedis();
        console.log("Redis connected successfully");
        console.log(`Server started, running on port ${PORT}`);
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
});
