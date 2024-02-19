import { param, body } from "express-validator";
import mongoose from "mongoose";
import CategoryModel from "../../models/CategoryModel.js";

const updateCategoryValidation = [
  param("categoryId").custom(async (categoryId) => {
    const validCategoryId = mongoose.Types.ObjectId.isValid(categoryId);
    if (!validCategoryId) return Promise.reject("category id is not valid");
    const category = await CategoryModel.findOne({ _id: categoryId });
    if (!category) return Promise.reject("category doesn't exists");
  }),
  body("name").optional(),
  body("description").optional(),
  body("color").optional(),
  body("image").optional(),
];
export default updateCategoryValidation;
