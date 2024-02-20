import { body, param } from "express-validator";
import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";
import UserModel from "../../models/UserModel.js";

const addCommentValidation = [
  param("taskId")
    .exists("falsy")
    .custom(async (taskId) => {
      const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
      if (!validTaskId) return Promise.reject("Invalid Task id");
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) return Promise.reject("Task doesn't exists with that id");
    }),
  body("comment")
    .exists("falsy")
    .withMessage("Comment must be exists")
    .isString(),
  body("user")
    .exists("falsy")
    .withMessage("user must be exists")
    .custom(async (user) => {
      const validUser = mongoose.Types.ObjectId.isValid(user);
      if (!validUser) return Promise.reject("Invalid User id");
      const resultUser = await UserModel.findOne({ _id: user });
      if (!resultUser) {
        return Promise.reject("Unable to find user with that id");
      }
    }),
];
export default addCommentValidation;
