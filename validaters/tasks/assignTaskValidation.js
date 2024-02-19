import { body } from "express-validator";
import mongoose from "mongoose";
import UserModel from "../../models/UserModel.js";
import TaskModel from "../../models/TaskModel.js";

const assignTaskValidation = [
  body("userId")
    .exists("falsy")
    .custom(async (userId) => {
      const validUserId = mongoose.Types.ObjectId.isValid(userId);
      if (!validUserId) return Promise.reject("user id is not valid");
      const userExists = await UserModel.findOne({ _id: userId });
      if (!userExists)
        return Promise.reject(
          "User doesn't exists, Please enter existed user id"
        );
    }),
  body("taskId")
    .exists("falsy")
    .custom(async (taskId) => {
      const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
      if (!validTaskId) return Promise.reject("Task id is not valid");
      const taskExists = await TaskModel.findOne({ _id: taskId });
      if (!taskExists) {
        return Promise.reject(
          "Task doesn't exists, Please enter existed task id"
        );
      }
    }),
];

export default assignTaskValidation;
