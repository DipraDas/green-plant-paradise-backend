import { model, Schema } from "mongoose";
import { TOrder, TProductData } from "./order.interface";
import { Product } from "../product/product.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const productDataSchema = new Schema<TProductData>({
  id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema<TOrder>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  product: {
    type: [productDataSchema],
    required: true,
  },
});

// OrderSchema.pre<TOrder>("save", async function (next) {
//   const order = this;

//   // Check if each category ObjectId exists in the Category collection
//   for (const item of order.product) {
//     const product = await Product.findById(item.id);
//     if (!product) {
//       throw new AppError(
//         httpStatus.NOT_FOUND,
//         `Product with ID ${item.id} does not exist`
//       );
//     }

//     if (product.quantity < item.quantity) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         `Insufficient quantity for ${product.title}`
//       );
//     }
//   }

//   next();
// });

export const Order = model<TOrder>("Order", OrderSchema);
