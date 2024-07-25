import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import AppError from "../../error/AppError";

const createOrderIntoDB = async (payload: TOrder) => {
  // Check if each product exists and has enough quantity
  for (const item of payload.product) {
    const product = await Product.findById(item.id);
    if (!product) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with ID ${item.id} does not exist`
      );
    }

    if (product.quantity < item.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Insufficient quantity for ${product.title}`
      );
    }

    // Reduce the quantity of the product
    await Product.findByIdAndUpdate(
      item.id,
      { $inc: { quantity: -item.quantity } },
      { new: true }
    );
  }

  // Create the order
  const result = await Order.create(payload);
  return result;
};

const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  const OrderQuery = new QueryBuilder(
    Order.find().populate("categories"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await OrderQuery.modelQuery;
  const meta = await OrderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id).populate("product");
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await Order.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
