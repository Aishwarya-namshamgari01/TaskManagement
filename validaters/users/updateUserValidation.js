import { body, param } from "express-validator";
import UserModel from "../../models/UserModel.js";
import mongoose from "mongoose";

const updateUserValidation = [
  param("userId")
    .notEmpty()
    .custom(async (userId, req) => {
      const validUserId = mongoose.Types.ObjectId.isValid(userId);
      if (!validUserId) return Promise.reject("Invalid User id");
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return Promise.reject("Unable to find user with that id");
      }
      
    }),
  body("name").optional(),
  body("email").optional(),
  body("role").optional(),
  body("bio").optional(),
  body("image").optional(),
];
export default updateUserValidation;
