import { Router } from "express";
import verifyToken from "../helpers/verifyToken.js";
import createCategory from "../controllers/categories/createCategory.js";
import uploadSingleFile from "../helpers/uploadSingleFile.js";
import getAllCategories from "../controllers/categories/getAllCategories.js";
import getCategoryById from "../controllers/categories/getCategoryById.js";
import updateCategoryById from "../controllers/categories/updateCategoryById.js";
import deleteCategoryById from "../controllers/categories/deleteCategoryById.js";
import createCategoryValidation from "../validaters/categories/createCategoryValidation.js";
import validationErrorHandler from "../helpers/validationErrorHandler.js";
import updateCategoryValidation from "../validaters/categories/updateCategoryValidation.js";
import categoryIdValidation from "../validaters/categories/categoryIdValidation.js";
import authorizeRole from "../helpers/authorizeRole.js";

const router = Router();
router.post(
  "/createCategory",
  verifyToken,
  uploadSingleFile,
  createCategoryValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN"],
    errorMessage: "Only admin can create categories",
  }),
  createCategory
);
router.get("/getAllCategories", verifyToken, getAllCategories);
router.get(
  "/getCategoryById/:categoryId",
  verifyToken,
  categoryIdValidation,
  validationErrorHandler,
  getCategoryById
);
router.patch(
  "/updateCategoryById/:categoryId",
  verifyToken,
  uploadSingleFile,
  updateCategoryValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN"],
    errorMessage: "Only admin can able to update category",
  }),
  updateCategoryById
);
router.delete(
  "/deleteCategoryById/:categoryId",
  verifyToken,
  categoryIdValidation,
  validationErrorHandler,
  authorizeRole({
    allowedRoles: ["ADMIN"],
    errorMessage: "Only admin can able to delete category",
  }),
  deleteCategoryById
);

export { router as CategoryRouter };
