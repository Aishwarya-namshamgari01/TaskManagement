import { body } from "express-validator";
import mongoose from "mongoose";
import CategoryModel from "../../models/CategoryModel.js";
import UserModel from "../../models/UserModel.js";

const createTaskValidation = [
  body("name")
    .exists("falsy")
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be String"),

  body("status").isIn(["pending", "inProgress", "completed"]).optional(),
  body("priority").isIn(["low", "medium", "high"]).optional(),
  body("comments").optional(),
  body("dueDate").optional(),
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
      if (!validCategory) throw new Error("Not a valid Object id");
      const categoryExists = await CategoryModel.findOne({ _id: categoryId });
      if (!categoryExists) return Promise.reject("Category doesn't exists");
    }),
  body("dependencies")
    .isArray()
    .withMessage("depencies should be array")
    .optional(),

  body("dependencies.*")
    .isMongoId()
    .withMessage("It should be valid object id"),
];

export default createTaskValidation;
