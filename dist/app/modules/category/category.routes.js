"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/create-category", (0, validateRequest_1.default)(category_validation_1.CategoryValidation.CategoryValidationSchema), category_controller_1.CategoryControllers.createCategory);
router.get("/:id", category_controller_1.CategoryControllers.getSingleCategory);
router.patch("/:id", (0, validateRequest_1.default)(category_validation_1.CategoryValidation.CategoryValidationSchema), category_controller_1.CategoryControllers.updateCategory);
router.get("/", category_controller_1.CategoryControllers.getAllCategory);
router.delete("/:id", category_controller_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
