import { body } from "express-validator";
import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";
import LabelModel from "../../models/LabelModel.js";

const addLabelToTaskValidation = [
  body("taskId")
    .exists("falsy")
    .custom(async (taskId) => {
      const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
      if (!validTaskId) return Promise.reject("Invalid task id");
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) return Promise.reject("Task doesn't exists with task id");
    }),
  body("labelId")
    .exists("falsy")
    .custom(async (labelId) => {
      const validLabelId = mongoose.Types.ObjectId.isValid(labelId);
      if (!validLabelId) return Promise.reject("Invalid label id ");
      const label = await LabelModel.findOne({ _id: labelId });
      if (!label) return Promise.reject("Label doesn't exist with label id");
    }),
];
export default addLabelToTaskValidation;
