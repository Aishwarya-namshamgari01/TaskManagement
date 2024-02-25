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
import authorizeRole from "../helpers/authorizeRole.js";
import userIdValidation from "../validaters/users/userIdValidation.js";
import getUserById from "../controllers/users/getUserById.js";

const router = Router();

router.post(
  "/register",
  verifyToken,
  uploadSingleFile,
  createUserValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN"],
    errorMessage: "Only ADMIN can create users",
  }),
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

router.get(
  "/getAllUsers",
  verifyToken,
  authorizeRole({
    allowedRoles: ["ADMIN"],
    errorMessage: "Please login as ADMIN to view users list",
  }),
  getAllUsers
);

router.get(
  "/getUserById/:userId",
  verifyToken,
  userIdValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN", "USER"],
    errorMessage: "Only admin or own user can view details",
    verifyOwnUser: true,
  }),
  getUserById
);

router.patch(
  "/updateUserById/:userId",
  verifyToken,
  uploadSingleFile,
  updateUserValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN", "USER"],
    errorMessage: "Only admin or own user can edit details",
    verifyOwnUser: true,
  }),
  updateUserById
);
router.delete(
  "/deleteUserById/:userId",
  verifyToken,
  userIdValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN"],
    errorMessage: "Admin user can only delete users",
  }),
  deleteUserById
);
export { router as AuthRouter };
