"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.post("/create-product", (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductValidationSchema), product_controller_1.ProductControllers.createProduct);
router.get("/:productId", product_controller_1.ProductControllers.getSingleProduct);
router.get("/", product_controller_1.ProductControllers.getAllProduct);
router.patch("/:productId", (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductValidationSchema), product_controller_1.ProductControllers.updateProduct);
router.delete("/:productId", product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
