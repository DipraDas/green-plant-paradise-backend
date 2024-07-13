import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import { Product } from "./product.model";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is created successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product are retrieved successfully",
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductIntoDB(productId, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated successfully",
    data: result,
  });
});

export const ProductControllers = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct
}
