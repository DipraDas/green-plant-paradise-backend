"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const productDataSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const OrderSchema = new mongoose_1.Schema({
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
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
