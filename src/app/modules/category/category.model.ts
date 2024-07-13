import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const CategorySchema = new Schema<TCategory>({
  name: { type: String, required: true, unique: true },
});

CategorySchema.pre("save", async function (next) {  
  const isDepartmentExist = await Category.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${this.name} category already exist!`
    );
  }

  next();
});

CategorySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await Category.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This category does not exist!`);
  }

  next();
});

export const Category = model<TCategory>("Category", CategorySchema);
