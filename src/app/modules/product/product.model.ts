import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";
import { Category } from "../category/category.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { boolean } from "zod";

const ProductSchema = new Schema<TProduct>({
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
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  featured: {
    type: Boolean,
    required: true
  }
});

ProductSchema.path("categories").validate(function (value) {
  return value.length > 0;
}, "Product must have at least one category.");


ProductSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isProductExist = await Category.findOne(query);

  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Product does not exist!`);
  }

  next();
});

ProductSchema.pre<TProduct>("save", async function (next) {
  const product = this;

  const isProductExist = await Category.findOne({
    title: this.title,
  });

  if (isProductExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${this.title} product already exist!`
    );
  }
  // Check if each category ObjectId exists in the Category collection
  for (const categoryId of product.categories) {
    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, `This Category does not exist`);
    }
  }

  next();
});

export const Product = model<TProduct>("Product", ProductSchema);
