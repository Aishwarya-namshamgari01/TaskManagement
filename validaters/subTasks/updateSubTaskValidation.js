import { param, body } from "express-validator";
import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";

const updateSubTaskValidation = [
  param("taskId").custom(async (taskId) => {
    const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
    if (!validTaskId) return Promise.reject("Invalid Task id");
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) return Promise.reject("Task doesn't exists with that id");
  }),
  body("subTaskId").custom(async (subTaskId, { req }) => {
    const validSubTaskId = mongoose.Types.ObjectId.isValid(subTaskId);
    if (!validSubTaskId) return Promise.reject("In valid sub task Id");
    const subtask = await TaskModel.findOne({
      _id: req.params.taskId,
      "subTasks._id": subTaskId,
    });
    if (!subtask) return Promise.reject("Subtask doesn't exists");
  }),
  body("status").optional().isIn(["pending", "inProgress", "completed"]),
];
export default updateSubTaskValidation;
