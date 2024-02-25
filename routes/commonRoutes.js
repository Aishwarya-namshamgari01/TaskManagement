import { Router } from "express";
import verifyToken from "../helpers/verifyToken.js";
import getAllNotifications from "../controllers/notifications.js/getAllNotifications.js";
import verifyEmailToken from "../helpers/emails/verifyEmailToken.js";

const router = Router();
router.get("/getAllNotifications/:userId", verifyToken, getAllNotifications);
router.get("/verify/:token", verifyEmailToken);

export { router as CommonRouter };
