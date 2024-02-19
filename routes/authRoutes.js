import { Router } from "express";
import registration from "../controllers/auth/registration.js";
import validationErrorHandler from "../helpers/validationErrorHandler.js";
import createUserValidation from "../validaters/users/createUserValidation.js";
import login from "../controllers/auth/login.js";
import loginValidation from "../validaters/users/loginValidation.js";
import verifyToken from "../helpers/verifyToken.js";
import getAllUsers from "../controllers/users/getAllUsers.js";
import updateUserById from "../controllers/users/updateUserById.js";
import deleteUserById from "../controllers/users/deleteUserById.js";
import uploadSingleFile from "../helpers/uploadSingleFile.js";
import createAdmin from "../controllers/auth/createAdmin.js";
import updateUserValidation from "../validaters/users/updateUserValidation.js";
import deleteUserValidation from "../validaters/users/deleteUserValidation.js";

const router = Router();

router.post(
  "/register",
  verifyToken,
  uploadSingleFile,
  createUserValidation,
  validationErrorHandler,
  registration
);

router.post(
  "/createAdmin",
  uploadSingleFile,
  createUserValidation,
  validationErrorHandler,
  createAdmin
);

router.post("/login", loginValidation, validationErrorHandler, login);

router.get("/getAllUsers", verifyToken, getAllUsers);
router.patch(
  "/updateUserById/:userId",
  verifyToken,
  uploadSingleFile,
  updateUserValidation,
  validationErrorHandler,
  updateUserById
);
router.delete(
  "/deleteUserById/:userId",
  verifyToken,
  deleteUserValidation,
  validationErrorHandler,
  deleteUserById
);
export { router as AuthRouter };
