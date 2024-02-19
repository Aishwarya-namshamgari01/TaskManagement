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
  body("status")
    .isIn(["pending", "inProgress", "completed"])
    .optional()
    .custom(async (status, { req }) => {
      const { dependencies } = req.body;
      const completed = dependencies.every((item) => {
        return item.status === "completed";
      });
      if (status === "completed" && !completed) {
        return Promise.reject(
          "All the dependencies should be completed. then only you can move this to completed"
        );
      }
    }),
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

  body("dependencies")
    .isArray()
    .optional()
    .custom(async (value, { req }) => {
      const exists = value.includes(req.params.taskId);
      if (exists) return Promise.reject("Task itself can't be a dependency");
    }),
  body("dependencies.*").isMongoId().withMessage("it should be valid mongo id"),
];

export default updateTaskValidation;
