import { body, check } from "express-validator";

const loginValidation = [
  body("email").isEmail().withMessage("Enter a valid email"),
  check(
    "password",
    "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
];

export default loginValidation;
