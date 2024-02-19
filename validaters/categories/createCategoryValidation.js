import { body } from "express-validator";

const createCategoryValidation = [
  body("name")
    .exists("falsy")
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be string"),
  body("description").optional(),
  body("color").optional(),
  body("icon").optional(),
];
export default createCategoryValidation;
