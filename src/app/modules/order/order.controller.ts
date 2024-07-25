import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is created successfully",
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrderFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { OrderId } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(OrderId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is retrieved successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { OrderId } = req.params;
  const result = await OrderServices.updateOrderIntoDB(OrderId, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { OrderId } = req.params;
  const result = await OrderServices.deleteOrderFromDB(OrderId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is deleted successfully",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
