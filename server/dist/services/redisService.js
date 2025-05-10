import { createClient } from "redis";
import { addTasksToMongo } from "./mongoService.js";
import { REDIS_KEY, url } from "../const/config.js";
let redisClient;
export const connectRedis = () => {
    redisClient = createClient({
        socket: {
            reconnectStrategy: (retries, cause) => {
                if (retries > 10)
                    return new Error("Too many retries");
                return Math.min(retries * 50, 2000); // Backoff strategy
            },
        },
        url: url,
    });
    redisClient.connect().catch(console.error);
    redisClient.on("error", (err) => {
        console.error(" Redis Client Error:", err);
    });
    redisClient.on("connect", () => {
        console.log(" Redis connected");
    });
    redisClient.on("end", () => {
        console.warn("Redis connection closed");
    });
};
export async function addTaskToRedis(task) {
    try {
        const existing = await redisClient.get(REDIS_KEY);
        const tasks = existing ? JSON.parse(existing) : [];
        tasks.push(task);
        await redisClient.set(REDIS_KEY, JSON.stringify(tasks));
    }
    catch (error) {
        console.error("Error adding task to Redis:", error);
    }
}
export async function getAllTasks() {
    console.log("Fetching tasks from Redis");
    try {
        const redisData = await redisClient.get(REDIS_KEY);
        const redisTasks = redisData ? JSON.parse(redisData) : [];
        const mongoTasks = await addTasksToMongo([]);
        console.log(REDIS_KEY, redisTasks, mongoTasks);
        return [...redisTasks, ...mongoTasks];
    }
    catch (error) {
        console.error("Error fetching tasks from Redis:", error);
        return Promise.reject(error);
    }
}
export async function checkAndMigrateTasks() {
    const redisData = await redisClient.get(REDIS_KEY);
    const tasks = redisData ? JSON.parse(redisData) : [];
    if (tasks.length > 50) {
        await addTasksToMongo(tasks);
        await redisClient.del(REDIS_KEY);
    }
}
