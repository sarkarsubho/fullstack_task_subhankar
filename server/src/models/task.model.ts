import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  task: String,
});

export const Task = mongoose.model("assignment_subhankar", TaskSchema);
