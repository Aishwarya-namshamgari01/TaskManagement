import { body, param } from "express-validator";
import mongoose from "mongoose";
import LabelModel from "../../models/LabelModel.js";

const updateLabelByIdValidation = [
  param("labelId")
    .exists("falsy")
    .custom(async (labelId) => {
      const validLabelId = mongoose.Types.ObjectId.isValid(labelId);
      if (!validLabelId) return Promise.reject("Invalid label id ");
      const label = await LabelModel.findOne({ _id: labelId });
      if (!label) return Promise.reject("Label doesn't exist with label id");
    }),
  body("name").optional().isString(),
  body("color").optional().isString(),
];
export default updateLabelByIdValidation;
