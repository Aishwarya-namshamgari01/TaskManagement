import { Router } from "express";
import verifyToken from "../helpers/verifyToken.js";
import getAllNotifications from "../controllers/notifications.js/getAllNotifications.js";

const router = Router();
router.get("/getAllNotifications/:userId", verifyToken, getAllNotifications);

export { router as CommonRouter };
