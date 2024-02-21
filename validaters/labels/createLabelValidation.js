import { body } from "express-validator";
import LabelModel from "../../models/LabelModel.js";

const createLabelValidation = [
  body("name")
    .exists("falsy")
    .withMessage("Name must be there")
    .isString()
    .custom(async (name, { req }) => {
      const labelExists = await LabelModel.findOne({
        name: { $regex: new RegExp(`^${name}$`), $options: "i" },
      });
      if (labelExists) return Promise.reject("Label with name already exists");
    }),
  body("color").optional().isString(),
];
export default createLabelValidation;
