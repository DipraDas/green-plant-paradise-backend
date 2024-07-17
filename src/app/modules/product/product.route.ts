import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductControllers } from "./product.controller";

const router = Router();

router.post(
  "/create-product",
  ValidateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct
);

router.get("/:productId", ProductControllers.getSingleProduct);
router.get("/", ProductControllers.getAllProduct);
router.patch(
  "/:productId",
  ValidateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct
);
router.delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = router;