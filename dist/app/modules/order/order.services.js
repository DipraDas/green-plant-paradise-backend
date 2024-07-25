"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if each product exists and has enough quantity
    for (const item of payload.product) {
        const product = yield product_model_1.Product.findById(item.id);
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID ${item.id} does not exist`);
        }
        if (product.quantity < item.quantity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Insufficient quantity for ${product.title}`);
        }
        // Reduce the quantity of the product
        yield product_model_1.Product.findByIdAndUpdate(item.id, { $inc: { quantity: -item.quantity } }, { new: true });
    }
    // Create the order
    const result = yield order_model_1.Order.create(payload);
    return result;
});
const getAllOrderFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate("categories"), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield OrderQuery.modelQuery;
    const meta = yield OrderQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id).populate("product");
    return result;
});
const updateOrderIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndDelete(id);
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
    getSingleOrderFromDB,
    updateOrderIntoDB,
    deleteOrderFromDB,
};
