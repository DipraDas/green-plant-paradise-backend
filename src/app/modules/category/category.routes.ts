import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/create-category",
  ValidateRequest(CategoryValidation.CategoryValidationSchema),
  CategoryControllers.createCategory
);

router.get("/:id", CategoryControllers.getSingleCategory);

router.patch(
  "/:id",
  ValidateRequest(CategoryValidation.CategoryValidationSchema),
  CategoryControllers.updateCategory
);

router.get("/", CategoryControllers.getAllCategory);
router.delete("/:id", CategoryControllers.deleteCategory);
export const CategoryRoutes = router;
