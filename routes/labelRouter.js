import { Router } from "express";
import verifyToken from "../helpers/verifyToken.js";
import createLabelValidation from "../validaters/labels/createLabelValidation.js";
import validationErrorHandler from "../helpers/validationErrorHandler.js";
import createLabel from "../controllers/labels/createLabel.js";
import addLabelToTask from "../controllers/labels/addLabelToTask.js";
import addLabelToTaskValidation from "../validaters/labels/addLabelToTaskValidation.js";
import deleteLabelFromTask from "../controllers/labels/deleteLabelFromTask.js";
import getAllLabels from "../controllers/labels/getAllLabels.js";
import updateLabelByIdValidation from "../validaters/labels/updateLabelByIdValidation.js";
import updateLabelById from "../controllers/labels/updateLabelById.js";

const router = Router();

router.post(
  "/createLabel",
  verifyToken,
  createLabelValidation,
  validationErrorHandler,
  createLabel
);

router.post(
  "/addLabelToTask",
  verifyToken,
  addLabelToTaskValidation,
  validationErrorHandler,
  addLabelToTask
);

router.post(
  "/deleteLabelFromTask",
  verifyToken,
  addLabelToTaskValidation,
  validationErrorHandler,
  deleteLabelFromTask
);

router.patch(
  "/updateLabelById/:labelId",
  verifyToken,
  updateLabelByIdValidation,
  validationErrorHandler,
  updateLabelById
);

router.get("/getAllLabels", verifyToken, getAllLabels);

export { router as LabelRouter };
