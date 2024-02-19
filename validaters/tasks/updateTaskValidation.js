import { body, param } from "express-validator";
import mongoose from "mongoose";
import CategoryModel from "../../models/CategoryModel.js";
import UserModel from "../../models/UserModel.js";
import TaskModel from "../../models/TaskModel.js";

const updateTaskValidation = [
  param("taskId").custom(async (taskId) => {
    const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
    if (!validTaskId) return Promise.reject("In valid object id");
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) return Promise.reject("Task doesnot exists");
  }),
  body("name").optional(),
  body("status").isIn(["pending", "completed"]).optional(),
  body("priority").isIn(["low", "medium", "high"]).optional(),
  body("comments").optional(),
  body("dueDate").optional(),
  body("images").optional(),
  body("userId")
    .optional()
    .custom(async (userId) => {
      const validUserId = mongoose.Types.ObjectId.isValid(userId);
      if (!validUserId) return Promise.reject("In valid object id");
      const user = await UserModel.findOne({ _id: userId });
      if (!user) return Promise.reject("user doesnot exists");
    }),
  body("categoryId")
    .optional()
    .custom(async (categoryId, { req }) => {
      const validCategory = mongoose.Types.ObjectId.isValid(categoryId);
      if (!validCategory) return Promise.reject("Not a valid Object id");
      const categoryExists = await CategoryModel.findOne({ _id: categoryId });
      if (!categoryExists) return Promise.reject("Category doesn't exists");
    }),
];

export default updateTaskValidation;
