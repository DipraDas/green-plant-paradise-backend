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
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const category_model_1 = require("../category/category.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        // default: function () {
        //   return Math.floor(Math.random() * 5) + 1;
        // },
    },
    description: {
        type: String,
        required: true,
    },
    briefDescription: {
        type: String,
        required: true,
    },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    ],
    featured: {
        type: Boolean,
        required: true,
    },
});
ProductSchema.path("categories").validate(function (value) {
    return value.length > 0;
}, "Product must have at least one category.");
ProductSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isProductExist = yield exports.Product.findOne(query);
        if (!isProductExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Product does not exist!');
        }
        next();
    });
});
ProductSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = this;
        const isProductExist = yield exports.Product.findOne({
            title: this.title,
        });
        if (isProductExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, ` ${this.title} product already exist!`);
        }
        // Check if each category ObjectId exists in the Category collection
        for (const categoryId of product.categories) {
            const categoryExists = yield category_model_1.Category.exists({ _id: categoryId });
            if (!categoryExists) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Category does not exist');
            }
        }
        next();
    });
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
