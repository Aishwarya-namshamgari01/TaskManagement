import { validationResult } from "express-validator";

const validationErrorHandler = (req, res, next) => {
  const error = validationResult(req);
  console.log({ errse: error });
  if (error.isEmpty()) {
    next();
  } else {
    res.status(400).json({
      bodyValidationErrors: error.array({ onlyFirstError: true }),
    });
  }
};

export default validationErrorHandler;
