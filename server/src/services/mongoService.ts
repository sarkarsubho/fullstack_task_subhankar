import mongoose from 'mongoose';
import { MONGO_URI } from '../const/config.js';
import { Task } from '../models/task.model.js';


export async function connectMongo() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
}

export async function addTasksToMongo(tasks: {task:string}[]): Promise<string[]> {
  if (tasks.length > 0) {
    const docs = tasks.map((task) => ({ task }));
    await Task.insertMany(docs);
  }
  const allTasks = await Task.find({}).lean().exec()
  return allTasks.map((doc) => doc.task).filter((task): task is string => task !== null && task !== undefined);
}
