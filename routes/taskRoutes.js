import { Router } from "express";
import verifyToken from "../helpers/verifyToken.js";
import uploadMultipleFiles from "../helpers/uploadMultipleFiles.js";
import createTask from "../controllers/tasks/createTask.js";
import getAllTasks from "../controllers/tasks/getAllTasks.js";
import getTaskById from "../controllers/tasks/getTaskById.js";
import updateTaskById from "../controllers/tasks/updateTaskById.js";
import deleteTaskById from "../controllers/tasks/deleteTaskById.js";
import createTaskValidation from "../validaters/tasks/createTaskValidation.js";
import validationErrorHandler from "../helpers/validationErrorHandler.js";
import getTasksByUserId from "../controllers/tasks/getTasksByUserId.js";
import getTasksByCategoryId from "../controllers/tasks/getTasksByCategoryId.js";
import assignTask from "../controllers/tasks/assignTask.js";
import assignTaskValidation from "../validaters/tasks/assignTaskValidation.js";
import updateTaskValidation from "../validaters/tasks/updateTaskValidation.js";
import validateTaskId from "../validaters/tasks/validateTaskId.js";
import getTasksByCategoryIdValidation from "../validaters/tasks/getTasksByCategoryIdValidation.js";
import getTasksByUserIdValidation from "../validaters/tasks/getTasksByUserIdValidation.js";
import addCommentValidation from "../validaters/comments/addCommentValidation.js";
import addComment from "../controllers/comments/addComment.js";
import createSubTaskValidation from "../validaters/subTasks/createSubTaskValidation.js";
import createSubTask from "../controllers/subTasks/createSubTask.js";
import updateSubTask from "../controllers/subTasks/updateSubTask.js";
import updateSubTaskValidation from "../validaters/subTasks/updateSubTaskValidation.js";

const router = Router();
router.post(
  "/createTask",
  verifyToken,
  uploadMultipleFiles,
  createTaskValidation,
  validationErrorHandler,
  createTask
);
router.get("/getAllTasks", verifyToken, getAllTasks);
router.get(
  "/getTaskById/:taskId",
  verifyToken,
  validateTaskId,
  validationErrorHandler,
  getTaskById
);
router.patch(
  "/updateTaskById/:taskId",
  verifyToken,
  uploadMultipleFiles,
  updateTaskValidation,
  validationErrorHandler,
  updateTaskById
);
router.delete(
  "/deleteTaskById/:taskId",
  verifyToken,
  validateTaskId,
  validationErrorHandler,
  deleteTaskById
);

router.get(
  "/getTasksByUserId/:userId",
  verifyToken,
  getTasksByUserIdValidation,
  validationErrorHandler,
  getTasksByUserId
);

router.get(
  "/getTasksByCategoryId/:categoryId",
  verifyToken,
  getTasksByCategoryIdValidation,
  validationErrorHandler,
  getTasksByCategoryId
);

router.post(
  "/assignTask",
  verifyToken,
  assignTaskValidation,
  validationErrorHandler,
  assignTask
);

router.patch(
  "/addComment/:taskId",
  verifyToken,
  addCommentValidation,
  validationErrorHandler,
  addComment
);

router.patch(
  "/createSubTask/:taskId",
  verifyToken,
  createSubTaskValidation,
  validationErrorHandler,
  createSubTask
);

router.patch(
  "/updateSubTask/:taskId",
  verifyToken,
  updateSubTaskValidation,
  validationErrorHandler,
  updateSubTask
);

export { router as TaskRouter };
