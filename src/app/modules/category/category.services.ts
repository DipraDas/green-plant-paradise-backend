import QueryBuilder from "../../builder/QueryBuilder";
import { CategorySearchableFields } from "./category.constants";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = Category.create(payload);
  return result;
};

const updateCategoryIntoDB = async (id: string, payload: TCategory) => {
  const result = Category.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const CategoryQuery = new QueryBuilder(Category.find(), query)
    .search(CategorySearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await CategoryQuery.modelQuery;
  const meta = await CategoryQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  deleteCategoryFromDB,
};
