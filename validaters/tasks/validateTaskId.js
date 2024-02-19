import { param } from "express-validator";
import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";

const validateTaskId = [
  param("taskId").custom(async (taskId) => {
    const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
    if (!validTaskId) return Promise.reject("In valid object id");
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) return Promise.reject("Task doesnot exists");
  }),
];
export default validateTaskId;
