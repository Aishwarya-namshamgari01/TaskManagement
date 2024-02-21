import { body, param } from "express-validator";
import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";

const createTaskHistoryValidation = [
  param("taskId")
    .exists("falsy")
    .custom(async (taskId) => {
      const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
      if (!validTaskId) return Promise.reject("Invalid Task id");
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) return Promise.reject("Task doesn't exists with that id");
    }),
];
export default createTaskHistoryValidation;
