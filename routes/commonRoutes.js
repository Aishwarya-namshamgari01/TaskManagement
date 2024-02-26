import { Router } from "express";
import verifyToken from "../helpers/verifyToken.js";
import getAllNotifications from "../controllers/notifications.js/getAllNotifications.js";
import verifyEmailToken from "../helpers/emails/verifyEmailToken.js";
import forgotPassword from "../helpers/forgotResetPassword/forgotPassword.js";
import resetPassword from "../helpers/forgotResetPassword/resetPassword.js";
import getResetPasswordToken from "../helpers/forgotResetPassword/getResetPasswordToken.js";

const router = Router();
router.get("/getAllNotifications/:userId", verifyToken, getAllNotifications);
router.get("/verify/:token", verifyEmailToken);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:token", getResetPasswordToken);
router.post("/resetPassword", resetPassword);

export { router as CommonRouter };
