"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
router.post("/create-order", (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderValidationSchema), order_controller_1.OrderControllers.createOrder);
router.get("/:orderId", order_controller_1.OrderControllers.getSingleOrder);
router.get("/", order_controller_1.OrderControllers.getAllOrder);
router.patch("/:orderId", (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderValidationSchema), order_controller_1.OrderControllers.updateOrder);
router.delete("/:orderId", order_controller_1.OrderControllers.deleteOrder);
exports.OrderRoutes = router;
