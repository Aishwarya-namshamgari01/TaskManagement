import { body, check } from "express-validator";

const validRoles = ["ADMIN", "USER"];
const createUserValidation = [
  body("name")
    .exists("falsy")
    .withMessage("Name is required")
    .isString()
    .withMessage("name should be Sting"),

  body("email").isEmail().withMessage("Email should be valid"),
  body("role")
    .optional()
    .custom((value) => {
      if (!validRoles.includes(value)) {
        throw new Error("Invalid role");
      }
      return true;
    }),

  check(
    "password",
    "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
];

export default createUserValidation;
