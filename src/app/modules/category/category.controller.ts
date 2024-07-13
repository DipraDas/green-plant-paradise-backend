import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../middleware/catchAsync";
import { CategoryServices } from "./category.services";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is created successfully",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category are retrieved successfully",
    // meta: result.meta,
    data: result.result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryServices.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is deleted successfully",
    data: result,
  });
});
export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
};
