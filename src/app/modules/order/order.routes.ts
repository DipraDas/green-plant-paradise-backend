import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
import { OrderControllers } from "./order.controller";

const router = Router();

router.post(
  "/create-order",
  ValidateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.createOrder
);

router.get("/:orderId", OrderControllers.getSingleOrder);
router.get("/", OrderControllers.getAllOrder);
router.patch(
  "/:orderId",
  ValidateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.updateOrder
);
router.delete("/:orderId", OrderControllers.deleteOrder);

export const OrderRoutes = router;
